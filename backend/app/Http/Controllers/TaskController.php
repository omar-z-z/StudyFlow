<?php

namespace App\Http\Controllers;

use App\Http\Requests\Task\StoreTaskRequest;
use App\Http\Requests\Task\UpdateTaskRequest;
use App\Http\Resources\Task\TaskResource;
use App\Models\Task;
use Illuminate\Http\Request;

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

        return new TaskResource($task);
    }

    // PUT /api/tasks/{id}
    public function update(UpdateTaskRequest $request, Task $task)
    {
        Task::authorize('update', $task);

        $task->update($request->validated());

        return new TaskResource($task);
    }

    // DELETE /api/tasks/{id}
    public function destroy(Request $request, Task $task)
    {
        Task::authorize('delete', $task);

        $task->delete();

        return response()->json(['message' => 'Task deleted']);
    }

    // GET /api/tasks/{id}
    public function show(Request $request, Task $task)
    {
        Task::authorize('update', $task);

        return new TaskResource($task->load('course'));
    }
}
