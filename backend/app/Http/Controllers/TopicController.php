<?php

namespace App\Http\Controllers;

use App\Http\Requests\Topic\StoreTopicRequest;
use App\Http\Requests\Topic\UpdateTopicRequest;
use App\Http\Resources\TopicResource;
use App\Models\Course;
use App\Models\Topic;

class TopicController extends Controller
{
    // GET /api/courses/{course}/topics
    public function index(Course $course)
    {
        Course::authorize('view', $course);

        return TopicResource::collection(
            $course->topics()->get()
        );
    }

    // POST /api/courses/{course}/topics
    public function store(StoreTopicRequest $request, Course $course)
    {
        $topic = $course->topics()->create($request->validated());

        return new TopicResource($topic);
    }

    // GET /api/courses/{course}/topics/{topic}
    public function show(Course $course, Topic $topic)
    {
        Topic::authorize('view', $topic);

        return new TopicResource($topic);
    }

    // PUT /api/courses/{course}/topics/{topic}
    public function update(UpdateTopicRequest $request, Course $course, Topic $topic)
    {
        Topic::authorize('update', $topic);

        $topic->update($request->validated());

        return new TopicResource($topic);
    }

    // DELETE /api/courses/{course}/topics/{topic}
    public function destroy(Course $course, Topic $topic)
    {
        Topic::authorize('delete', $topic);

        $topic->delete();

        return response()->json(['message' => 'Topic deleted']);
    }
}