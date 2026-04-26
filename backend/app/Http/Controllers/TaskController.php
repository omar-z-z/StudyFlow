<?php

namespace App\Http\Controllers;

use App\Http\Requests\Task\StoreTaskRequest;
use App\Http\Requests\Task\UpdateTaskRequest;
use App\Http\Resources\TaskResource;
use App\Models\Task;
use App\Services\NotificationService;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Cache;

class TaskController extends Controller
{
    // GET /api/tasks
    public function index(Request $request)
    {
        $tasks = $request->user()->tasks()->with('course')->get();

        return TaskResource::collection($tasks);
    }

    // POST /api/tasks
    public function store(StoreTaskRequest $request)
    {
        $task = $request->user()->tasks()->create($request->validated());
        Cache::forget("progress_user_" . $request->user()->id);
        NotificationService::send(
            userId: $request->user()->id,
            type: 'task',
            title: 'Task Added',
            body: "\"{$task->title}\" has been added to your list.",
            icon: '📝',
            link: '/tasks'
        );

        return new TaskResource($task->load('course'));
    }

    // PUT /api/tasks/{id}
    public function update(UpdateTaskRequest $request, Task $task)
    {
        $this->authorize('update', $task);

        $wasCompleted = !$task->completed && $request->input('completed', true);
        $task->update($request->validated());
        Cache::forget("progress_user_" . $request->user()->id);

        if ($wasCompleted && $task->fresh()->completed) {
            NotificationService::taskCompleted($request->user()->id, $task->title);
        }
        return new TaskResource($task->load('course'));
    }

    // DELETE /api/tasks/{id}
    public function destroy(Request $request, Task $task)
    {
        $this->authorize('delete', $task);

        $taskName = $task->title;
        $task->delete();
        Cache::forget("progress_user_" . $request->user()->id);
        NotificationService::send(
            userId: $request->user()->id,
            type: 'task',
            title: '🗑️ Task Deleted',
            body: "\"{$taskName}\" has been removed.",
            icon: '🗑️',
            link: '/tasks'
        );

        return response()->json(['message' => 'Task deleted']);
    }

    // GET /api/tasks/{id}
    public function show(Request $request, Task $task)
    {
        $this->authorize('view', $task);

        return new TaskResource($task->load('course'));
    }
}
