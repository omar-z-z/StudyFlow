<?php

use App\Http\Controllers\AssignmentController;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\CourseController;
use App\Http\Controllers\GenerateCourseController;
use App\Http\Controllers\NotificationController;
use App\Http\Controllers\ProgressController;
use App\Http\Controllers\TaskController;
use App\Http\Controllers\TopicController;

// Public routes (no login required)
Route::post('/register', [AuthController::class, 'register']);
Route::post('/login',    [AuthController::class, 'login']);

// Protected routes (login required)
Route::middleware('auth:sanctum')->group(function () {

    // Auth
    Route::post('/logout', [AuthController::class, 'logout']);

    // Courses
    Route::apiResource('courses', CourseController::class);
    Route::apiResource('courses.topics', TopicController::class);
    Route::apiResource('courses.assignments', AssignmentController::class);

    // Deadlines
    Route::get('deadlines', [AssignmentController::class, 'deadlines']);

    // Tasks
    Route::apiResource('tasks', TaskController::class);

    // Progress
    Route::get('/progress', [ProgressController::class, 'index']);

    // Upload
    Route::post('/generate-course', GenerateCourseController::class);

    // Notifications
    Route::get('/notifications', [NotificationController::class, 'index']);
    Route::patch('/notifications/read-all', [NotificationController::class, 'markAllAsRead']);
    Route::patch('/notifications/{id}/read', [NotificationController::class, 'markAsRead']);
    Route::delete('/notifications/{id}', [NotificationController::class, 'destroy']);    
});