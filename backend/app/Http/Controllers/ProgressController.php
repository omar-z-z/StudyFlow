<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Models\Course;
use App\Models\Task;
use App\Models\UserGoal;
use Illuminate\Support\Carbon;
use Illuminate\Support\Facades\Auth;

class ProgressController extends Controller
{
    public function index()
    {
        $userId    = Auth::id();
        $weekStart = Carbon::now()->startOfWeek(Carbon::MONDAY);
        $weekEnd   = Carbon::now()->endOfWeek(Carbon::SUNDAY);

        return response()->json([
            'stats'           => $this->getStats($userId, $weekStart, $weekEnd),
            'dailyCompletion' => $this->getDailyCompletion($userId, $weekStart, $weekEnd),
            'tasksByType'     => $this->getTasksByType($userId, $weekStart, $weekEnd),
            'courseProgress'  => $this->getCourseProgress($userId),
            'summary'         => $this->getSummary($userId, $weekStart, $weekEnd),
        ]);
    }

    // Stats

    private function getStats(int $userId, Carbon $weekStart, Carbon $weekEnd): array
    {
        // Auto-create default goals if user has none yet
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
            'currentStreak'    => $this->calculateStreak($userId),
        ];
    }

    // Streak
    // Walk backwards, a day counts if the user completed at least one task on that date

    private function calculateStreak(int $userId): int
    {
        $streak = 0;
        $date   = Carbon::today();

        while (true) {
            $hasActivity = Task::where('user_id', $userId)
                ->where('completed', true)
                ->whereDate('date', $date->toDateString())
                ->exists();

            if (!$hasActivity) break;

            $streak++;
            $date->subDay();
        }

        return $streak;
    }

    // Daily Completion

    private function getDailyCompletion(int $userId, Carbon $weekStart, Carbon $weekEnd): array
    {
        $dayLabels = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
        $result    = [];

        for ($i = 0; $i < 7; $i++) {
            $day = $weekStart->copy()->addDays($i)->toDateString();

            $completed = Task::where('user_id', $userId)
                ->where('completed', true)
                ->whereDate('date', $day)
                ->count();

            $pending = Task::where('user_id', $userId)
                ->where('completed', false)
                ->whereDate('date', $day)
                ->count();

            $result[] = [
                'day'       => $dayLabels[$i],
                'completed' => $completed,
                'pending'   => $pending,
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
    // Topics don't have user_id, so we go through courses

    private function getCourseProgress(int $userId): array
    {
        return Course::where('user_id', $userId)
            ->with('topics')
            ->get()
            ->map(function ($course) {
                $total      = $course->topics->count();
                $completed  = $course->topics->where('completed', true)->count();
                $percentage = $total > 0 ? round(($completed / $total) * 100) : 0;

                return [
                    'id'              => (string) $course->id,
                    'name'            => $course->name,
                    'topicsCompleted' => $completed,
                    'topicsTotal'     => $total,
                    'percentage'      => $percentage,
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
            'dayStreak' => $this->calculateStreak($userId),
            'studyTime' => round($studyMinutes / 60, 1),
        ];
    }
}