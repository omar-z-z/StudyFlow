<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\CourseController;
use App\Http\Controllers\ProgressController;
use App\Http\Controllers\TaskController;

// Public routes (no login required)
Route::post('/register', [AuthController::class, 'register']);
Route::post('/login',    [AuthController::class, 'login']);

// Protected routes (login required)
Route::middleware('auth:sanctum')->group(function () {

    // Auth
    Route::post('/logout', [AuthController::class, 'logout']);

    // Courses
    Route::apiResource('courses', CourseController::class);

    // Tasks
    Route::apiResource('tasks', TaskController::class);

    // Progress
    Route::get('/progress', [ProgressController::class, 'index']);

});