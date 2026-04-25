<?php

namespace App\Http\Controllers;

use App\Models\Notification;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class NotificationController extends Controller
{
    // GET /api/notifications
    public function index(Request $request)
    {
        $userId = Auth::id();
        $notifications = Notification::forUser($userId)
            ->orderByDesc('created_at')
            ->limit(50)
            ->get();

        return response()->json([
            'notifications' => $notifications,
            'unread_count'  => $notifications->whereNull('read_at')->count(),
        ]);
    }

    // PATCH /api/notifications/{id}/read
    public function markAsRead(string $id)
    {
        $userId = Auth::id();
        $notification = Notification::forUser($userId)->findOrFail($id);
        $notification->update(['read_at' => now()]);

        return response()->json(['message' => 'Marked as read']);
    }

    // PATCH /api/notifications/read-all
    public function markAllAsRead()
    {
        $userId = Auth::id();
        Notification::forUser($userId)
            ->unread()
            ->update(['read_at' => now()]);

        return response()->json(['message' => 'All marked as read']);
    }

    // DELETE /api/notifications/{id}
    public function destroy(string $id)
    {
        $userId = Auth::id();
        Notification::forUser($userId)->findOrFail($id)->delete();
        return response()->json(['message' => 'Deleted']);
    }

}
