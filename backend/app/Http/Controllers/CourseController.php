<?php

namespace App\Http\Controllers;

use App\Http\Requests\Course\StoreCourseRequest;
use App\Http\Requests\Course\UpdateCourseRequest;
use App\Http\Resources\CourseResource;
use App\Models\Course;
use App\Services\NotificationService;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Cache;

class CourseController extends Controller
{
    // GET /api/courses
    public function index(Request $request)
    {
        $courses = $request->user()
            ->courses()
            ->with(['topics', 'assignments'])
            ->get();

        return CourseResource::collection($courses);
    }

    // POST /api/courses
    public function store(StoreCourseRequest $request)
    {
        $course = $request->user()->courses()->create($request->validated());
        Cache::forget("progress_user_" . $request->user()->id);
        NotificationService::send(
            userId: $request->user()->id,
            type: 'course',
            title: 'Course Added',
            body: "\"{$course->name}\" has been added to your courses.",
            link: '/courses'
        );

        return new CourseResource($course);
    }

    // GET /api/courses/{id}
    public function show(Request $request, Course $course)
    {
        $this->authorize('view', $course);

        return new CourseResource(
            $course->load(['topics', 'assignments', 'tasks'])
        );
    }

    // PUT /api/courses/{id}
    public function update(UpdateCourseRequest $request, Course $course)
    {
        $this->authorize('update', $course);

        $course->update($request->validated());
        Cache::forget("progress_user_" . $request->user()->id);

        return new CourseResource($course);
    }

    // DELETE /api/courses/{id}
    public function destroy(Request $request, Course $course)
    {
        $this->authorize('delete', $course);

        $course->delete();
        Cache::forget("progress_user_" . $request->user()->id);

        return response()->json(['message' => 'Course deleted']);
    }
}
