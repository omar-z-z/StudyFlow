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
        ?string $link = null
    ): ?Notification {
        $exists = Notification::where('user_id', $userId)
            ->where('type', $type)
            ->where('title', $title)
            ->where('body', $body)
            ->where('created_at', '>=', now()->subDay())
            ->exists();

        if ($exists) return null;

        return Notification::create([
            'user_id' => $userId,
            'type'    => $type,
            'title'   => $title,
            'body'    => $body,
            'link'    => $link,
        ]);
    }

    // Convenience methods for common events
    public static function taskDue(int $userId, string $taskName, string $link): void
    {
        self::send($userId, 'deadline', 'Deadline Due Soon', "$taskName is due tomorrow!", $link);
    }

    public static function taskCompleted(int $userId, string $taskName): void
    {
        self::send($userId, 'task_completed', 'Task Completed', "You completed: $taskName");
    }
}
