<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;
use App\Models\Assignment;
use App\Services\NotificationService;

class SendDeadlineReminders extends Command
{
    protected $signature   = 'notifications:deadline-reminders';
    protected $description = 'Notify users about upcoming assignment deadlines';

    public function handle(): void
    {
        Assignment::whereHas('course', fn($q) => $q->whereNotNull('user_id'))
            ->where('completed', false)
            ->whereBetween('due_date', [today()->addDay(), today()->addDays(7)])
            ->with('course')
            ->each(function ($assignment) {
                $daysLeft = (int) today()->diffInDays($assignment->due_date);

                $title = match (true) {
                    $daysLeft === 1 => 'Due Tomorrow',
                    $daysLeft <= 3  => "Due in {$daysLeft} Days",
                    default         => "Due in {$daysLeft} Days",
                };

                NotificationService::send(
                    userId: $assignment->course->user_id,
                    type: 'deadline',
                    title: $title,
                    body: "\"{$assignment->title}\" in {$assignment->course->name} is due in {$daysLeft} day(s).",
                    link: "/courses/{$assignment->course_id}"
                );

                $this->info("Notified: {$assignment->title} — {$daysLeft} days left");
            });

        $this->info('Done.');
    }
}
