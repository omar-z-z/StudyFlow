<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Http\Resources\ProgressResource;
use App\Services\ProgressService;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\Auth;
use Throwable;

class ProgressController extends Controller
{
    // Constructor injection: better for testability and Laravel's DI container.
    // Method injection works, but constructor injection makes dependencies explicit
    // and allows them to be mocked easily in feature/unit tests.
    public function __construct(
        private readonly ProgressService $progressService
    ) {}

    public function index(): ProgressResource|JsonResponse
    {
        // Validate the user is authenticated before touching the service.
        // Even if your route is guarded by middleware, this is a safe explicit check.
        $userId = Auth::id();

        if (! $userId) {
            return response()->json(['message' => 'Unauthenticated.'], 401);
        }

        try {
            $data = $this->progressService->getUserProgress($userId);

            return new ProgressResource($data);
        } catch (Throwable $e) {
            // Catch unexpected service-layer failures gracefully.
            // Log the error for debugging, but don't leak internal details to the client.
            report($e);

            return response()->json([
                'message' => 'Failed to load progress data. Please try again.',
            ], 500);
        }
    }
}
