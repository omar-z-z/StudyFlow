<?php

namespace App\Services;

use App\Models\Course;
use App\Models\Task;
use App\Models\UserGoal;
use Illuminate\Support\Carbon;
use Illuminate\Support\Facades\Cache;

class ProgressService
{
    // Memoize the streak result within the current request lifecycle.
    private ?int $cachedStreak = null;

    public function getUserProgress(int $userId): array
    {
        return Cache::remember(
            "progress_user_{$userId}",
            now()->addMinutes(5),
            function () use ($userId) {
                // Reset memoized streak for each cache-miss computation.
                $this->cachedStreak = null;

                $weekStart = now()->startOfWeek();
                $weekEnd   = now()->endOfWeek();

                return [
                    'stats'           => $this->getStats($userId, $weekStart, $weekEnd),
                    'dailyCompletion' => $this->getDailyCompletion($userId, $weekStart, $weekEnd),
                    'tasksByType'     => $this->getTasksByType($userId, $weekStart, $weekEnd),
                    'courseProgress'  => $this->getCourseProgress($userId),
                    'summary'         => $this->getSummary($userId, $weekStart, $weekEnd),
                ];
            }
        );
    }

    public function clearCache(int $userId): void
    {
        Cache::forget("progress_user_{$userId}");
    }

    // Stats
    private function getStats(int $userId, Carbon $weekStart, Carbon $weekEnd): array
    {
        $goals = UserGoal::firstOrCreate(
            ['user_id' => $userId],
            ['weekly_task_goal' => 20, 'weekly_hours_goal' => 20]
        );

        $weekRange = [$weekStart->toDateString(), $weekEnd->toDateString()];

        $completedThisWeek = Task::where('user_id', $userId)
            ->where('completed', true)
            ->whereBetween('date', $weekRange)
            ->count();

        $totalThisWeek = Task::where('user_id', $userId)
            ->whereBetween('date', $weekRange)
            ->count();

        $studyMinutes = Task::where('user_id', $userId)
            ->where('completed', true)
            ->whereBetween('date', $weekRange)
            ->sum('estimated_time');

        $completionRate = $totalThisWeek > 0
            ? round(($completedThisWeek / $totalThisWeek) * 100)
            : 0;

        return [
            'weeklyGoal'       => $completedThisWeek,
            'weeklyGoalTarget' => $goals->weekly_task_goal,
            'studyHours'       => round($studyMinutes / 60, 1),
            'studyHoursTarget' => $goals->weekly_hours_goal,
            'completionRate'   => $completionRate,
            'currentStreak'    => $this->calculateStreak($userId), // memoized
        ];
    }

    // Streak
    private function calculateStreak(int $userId): int
    {
        // Return memoized result if already computed in this request cycle.
        if ($this->cachedStreak !== null) {
            return $this->cachedStreak;
        }

        // Fetch ALL active days in a single query instead of one query per day.
        $activeDates = Task::where('user_id', $userId)
            ->where('completed', true)
            ->where('date', '>=', now()->subYear()->toDateString())
            ->selectRaw('DATE(date) as day')
            ->distinct()
            ->pluck('day')
            ->flip() // flip to a map for O(1) key lookup
            ->toArray();

        // if the user hasn't completed tasks yet today,
        // don't break their streak — start counting from yesterday instead.
        $date = Carbon::today();
        if (! isset($activeDates[$date->toDateString()])) {
            $date->subDay();
        }

        $streak = 0;
        while (isset($activeDates[$date->toDateString()])) {
            $streak++;
            $date->subDay();
        }

        $this->cachedStreak = $streak;

        return $streak;
    }

    // Daily Completion
    private function getDailyCompletion(int $userId, Carbon $weekStart, Carbon $weekEnd): array
    {

        $rows = Task::where('user_id', $userId)
            ->whereBetween('date', [$weekStart->toDateString(), $weekEnd->toDateString()])
            ->selectRaw('DATE(date) as day, completed, COUNT(*) as count')
            ->groupBy('day', 'completed')
            ->get()
            ->groupBy('day');

        $dayLabels = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
        $result    = [];

        for ($i = 0; $i < 7; $i++) {
            $day     = $weekStart->copy()->addDays($i)->toDateString();
            $dayData = $rows->get($day, collect());

            $result[] = [
                'day'       => $dayLabels[$i],
                'completed' => (int) $dayData->where('completed', true)->sum('count'),
                'pending'   => (int) $dayData->where('completed', false)->sum('count'),
            ];
        }

        return $result;
    }

    // Tasks by Type
    private function getTasksByType(int $userId, Carbon $weekStart, Carbon $weekEnd): array
    {
        $colorMap = [
            'reading'    => '#4E9AF1',
            'lecture'    => '#2DBF8A',
            'exercise'   => '#F59E0B',
            'review'     => '#A78BFA',
            'project'    => '#F87171',
            'assignment' => '#34D399',
            'other'      => '#9CA3AF',
        ];

        return Task::where('user_id', $userId)
            ->whereBetween('date', [$weekStart->toDateString(), $weekEnd->toDateString()])
            ->selectRaw('type, COUNT(*) as count')
            ->groupBy('type')
            ->get()
            ->map(fn($row) => [
                'name'  => ucfirst($row->type) . 's',
                'value' => (int) $row->count,
                'color' => $colorMap[$row->type] ?? '#9CA3AF',
            ])
            ->values()
            ->toArray();
    }

    // Course Progress
    private function getCourseProgress(int $userId): array
    {
        return Course::where('user_id', $userId)
            ->with('topics')
            ->get()
            ->map(function ($course) {
                $total     = $course->topics->count();
                $completed = $course->topics->where('completed', true)->count();

                return [
                    'id'              => (string) $course->id,
                    'name'            => $course->name,
                    'topicsCompleted' => $completed,
                    'topicsTotal'     => $total,
                    'percentage'      => $total > 0 ? round(($completed / $total) * 100) : 0,
                    'color'           => $course->color,
                ];
            })
            ->values()
            ->toArray();
    }

    // Summary
    private function getSummary(int $userId, Carbon $weekStart, Carbon $weekEnd): array
    {
        $weekRange = [$weekStart->toDateString(), $weekEnd->toDateString()];

        $tasksDone = Task::where('user_id', $userId)
            ->where('completed', true)
            ->whereBetween('date', $weekRange)
            ->count();

        $studyMinutes = Task::where('user_id', $userId)
            ->where('completed', true)
            ->whereBetween('date', $weekRange)
            ->sum('estimated_time');

        return [
            'tasksDone' => $tasksDone,
            'dayStreak' => $this->calculateStreak($userId), //  uses memoized value
            'studyTime' => round($studyMinutes / 60, 1),
        ];
    }
}