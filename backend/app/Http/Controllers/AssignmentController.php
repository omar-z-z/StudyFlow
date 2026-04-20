<?php

namespace App\Http\Controllers;

use App\Http\Requests\Assignment\StoreAssignmentRequest;
use App\Http\Requests\Assignment\UpdateAssignmentRequest;
use App\Http\Resources\AssignmentResource;
use App\Models\Assignment;
use App\Models\Course;
use Illuminate\Support\Facades\Cache;

class AssignmentController extends Controller
{
    // GET /api/courses/{course}/assignments
    public function index(Course $course)
    {
        $this->authorize('view', $course);

        return AssignmentResource::collection(
            $course->assignments()->get()
        );
    }

    // POST /api/courses/{course}/assignments
    public function store(StoreAssignmentRequest $request, Course $course)
    {
        $assignment = $course->assignments()->create($request->validated());
        Cache::forget("progress_user_" . $request->user()->id);

        return new AssignmentResource($assignment);
    }

    // GET /api/courses/{course}/assignments/{assignment}
    public function show(Course $course, Assignment $assignment)
    {
        $this->authorize('view', $assignment);

        return new AssignmentResource($assignment);
    }

    // PUT /api/courses/{course}/assignments/{assignment}
    public function update(UpdateAssignmentRequest $request, Course $course, Assignment $assignment)
    {
        $this->authorize('update', $assignment);

        $assignment->update($request->validated());
        Cache::forget("progress_user_" . $request->user()->id);

        return new AssignmentResource($assignment);
    }

    // DELETE /api/courses/{course}/assignments/{assignment}
    public function destroy(Course $course, Assignment $assignment)
    {
        $this->authorize('delete', $assignment);

        $assignment->delete();

        return response()->json(['message' => 'Assignment deleted']);
    }

    // GET /api/deadlines
    public function deadlines()
    {
        $user = request()->user();

        $deadlines = Assignment::whereHas('course', function ($query) use ($user) {
            $query->where('user_id', $user->id);
        })
            ->where('completed', false)
            ->whereBetween('due_date', [now(), now()->addDays(7)])
            ->orderBy('due_date')
            ->get();

        return AssignmentResource::collection($deadlines);
    }
}
