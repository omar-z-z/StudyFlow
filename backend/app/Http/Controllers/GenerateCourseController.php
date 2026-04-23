<?php

namespace App\Http\Controllers;

use App\Http\Requests\GenerateCourseRequest;
use App\Services\CourseGeneratorService;
use Illuminate\Http\JsonResponse;
use Exception;

class GenerateCourseController extends Controller
{
    public function __construct(
        private CourseGeneratorService $generator
    ) {}

    public function __invoke(GenerateCourseRequest $request): JsonResponse
    {
        try {
            $course = $this->generator->generate($request->validated('syllabus'));
            return response()->json($course, 200);
        } catch (Exception $e) {
            return response()->json([
                'message' => 'Failed to generate course.',
                'error'   => $e->getMessage(),
            ], 500);
        }
    }
}