<?php

namespace App\Http\Controllers;

use App\Models\Task;
use Illuminate\Http\Request;

class TaskController extends Controller
{
    // GET /api/tasks
    public function index(Request $request)
    {
        $tasks = $request->user()->tasks()->with('course')->get();

        return response()->json($tasks);
    }

    // POST /api/tasks
    public function store(Request $request)
    {
        $fields = $request->validate([
            'course_id'      => 'required|exists:courses,id',
            'title'          => 'required|string|max:255',
            'estimated_time' => 'required|integer',
            'priority'       => 'required|in:low,medium,high',
            'type'           => 'required|in:review,exercise,reading,project,assignment,lecture,other',
            'date'           => 'required|date',
        ]);

        $task = $request->user()->tasks()->create($fields);

        return response()->json($task, 201);
    }

    // PUT /api/tasks/{id}
    public function update(Request $request, Task $task)
    {
        if ($task->user_id !== $request->user()->id) {
            return response()->json(['message' => 'Unauthorized'], 403);
        }

        $fields = $request->validate([
            'title'          => 'sometimes|string|max:255',
            'completed'      => 'sometimes|boolean',
            'estimated_time' => 'sometimes|integer',
            'priority'       => 'sometimes|in:low,medium,high',
            'type'           => 'sometimes|in:review,exercise,reading,project,assignment,lecture,other',
            'date'           => 'sometimes|date',
        ]);

        $task->update($fields);

        return response()->json($task);
    }

    // DELETE /api/tasks/{id}
    public function destroy(Request $request, Task $task)
    {
        if ($task->user_id !== $request->user()->id) {
            return response()->json(['message' => 'Unauthorized'], 403);
        }

        $task->delete();

        return response()->json(['message' => 'Task deleted']);
    }
}
