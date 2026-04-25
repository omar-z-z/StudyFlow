<?php

namespace App\Services;

use App\Models\Notification;

class NotificationService
{
    public static function send(
        int $userId,
        string $type,
        string $title,
        string $body,
        ?string $icon = null,
        ?string $link = null
    ): Notification {
        return Notification::create([
            'user_id' => $userId,
            'type'    => $type,
            'title'   => $title,
            'body'    => $body,
            'icon'    => $icon,
            'link'    => $link,
        ]);
    }

    // Convenience methods for common events
    public static function taskDue(int $userId, string $taskName, string $link): void
    {
        self::send($userId, 'deadline', '⏰ Task Due Soon', "$taskName is due tomorrow!", '⏰', $link);
    }

    public static function taskCompleted(int $userId, string $taskName): void
    {
        self::send($userId, 'task', '✅ Task Completed', "You completed: $taskName", '✅');
    }

    public static function courseProgress(int $userId, string $courseName, int $percent): void
    {
        self::send($userId, 'course', '📈 Course Progress', "$courseName is $percent% complete!", '📈');
    }
}