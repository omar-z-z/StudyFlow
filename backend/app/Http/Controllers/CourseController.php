<?php

namespace App\Http\Controllers;

use App\Models\Course;
use Illuminate\Http\Request;

class CourseController extends Controller
{
    // GET /api/courses
    public function index(Request $request)
    {
        $courses = $request->user()
            ->courses()
            ->with(['topics', 'assignments'])
            ->get();

        return response()->json($courses);
    }

    // POST /api/courses
    public function store(Request $request)
    {
        $fields = $request->validate([
            'name'      => 'required|string|max:255',
            'color'     => 'required|string|max:7',
            'exam_date' => 'nullable|date',
        ]);

        $course = $request->user()->courses()->create($fields);

        return response()->json($course, 201);
    }

    // GET /api/courses/{id}
    public function show(Request $request, Course $course)
    {
        if ($course->user_id !== $request->user()->id) {
            return response()->json(['message' => 'Unauthorized'], 403);
        }

        return response()->json(
            $course->load(['topics', 'assignments', 'tasks'])
        );
    }

    // PUT /api/courses/{id}
    public function update(Request $request, Course $course)
    {
        if ($course->user_id !== $request->user()->id) {
            return response()->json(['message' => 'Unauthorized'], 403);
        }

        $fields = $request->validate([
            'name'      => 'sometimes|string|max:255',
            'color'     => 'sometimes|string|max:7',
            'progress'  => 'sometimes|integer|min:0|max:100',
            'exam_date' => 'sometimes|nullable|date',
        ]);

        $course->update($fields);

        return response()->json($course);
    }

    // DELETE /api/courses/{id}
    public function destroy(Request $request, Course $course)
    {
        if ($course->user_id !== $request->user()->id) {
            return response()->json(['message' => 'Unauthorized'], 403);
        }

        $course->delete();

        return response()->json(['message' => 'Course deleted']);
    }
}