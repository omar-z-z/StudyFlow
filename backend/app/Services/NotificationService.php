<?php

namespace App\Services;

use App\Models\Notification;
use App\Models\PushSubscription;
use Minishlink\WebPush\WebPush;
use Minishlink\WebPush\Subscription;

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

        $notification = Notification::create([
            'user_id' => $userId,
            'type'    => $type,
            'title'   => $title,
            'body'    => $body,
            'link'    => $link,
        ]);

        // Send push alongside every in-app notification
        self::sendPush($userId, $title, $body, $link);

        return $notification;
    }

    // sends to all user's subscribed devices
    public static function sendPush(
        int $userId,
        string $title,
        string $body,
        ?string $link = null
    ): void {
        $subscriptions = PushSubscription::where('user_id', $userId)->get();
        if ($subscriptions->isEmpty()) return;

        $webPush = new WebPush([
            'VAPID' => [
                'subject'    => config('services.vapid.subject'),
                'publicKey'  => config('services.vapid.public_key'),
                'privateKey' => config('services.vapid.private_key'),
            ],
        ]);

        $payload = json_encode([
            'title' => $title,
            'body'  => $body,
            'link'  => $link ?? '/',
        ]);

        foreach ($subscriptions as $sub) {
            $webPush->queueNotification(
                Subscription::create([
                    'endpoint' => $sub->endpoint,
                    'keys'     => [
                        'p256dh' => $sub->public_key,
                        'auth'   => $sub->auth_token,
                    ],
                ]),
                $payload
            );
        }

        foreach ($webPush->flush() as $report) {
            // Remove expired subscriptions automatically
            if (!$report->isSuccess() && $report->isSubscriptionExpired()) {
                PushSubscription::where('endpoint', $report->getEndpoint())->delete();
            }
        }
    }

    public static function taskDue(int $userId, string $taskName, string $link): void
    {
        self::send($userId, 'deadline', 'Deadline Due Soon', "$taskName is due tomorrow!", $link);
    }

    public static function taskCompleted(int $userId, string $taskName): void
    {
        self::send($userId, 'task_completed', 'Task Completed', "You completed: $taskName");
    }
}