<?php

namespace Database\Seeders;

use App\Models\Course;
use App\Models\User;
use Illuminate\Database\Seeder;

class CourseSeeder extends Seeder
{
    public function run(): void
    {
        $user = User::where('email', 'test@example.com')->first();

        $courses = [
            ['name' => 'Data Structures & Algorithms', 'color' => '#3b82f6', 'progress' => 62, 'exam_date' => now()->addDays(13)->toDateString()],
            ['name' => 'Machine Learning',              'color' => '#10b981', 'progress' => 45, 'exam_date' => now()->addDays(18)->toDateString()],
            ['name' => 'Web Development',               'color' => '#f59e0b', 'progress' => 78, 'exam_date' => now()->addDays(10)->toDateString()],
            ['name' => 'Database Systems',              'color' => '#8b5cf6', 'progress' => 55, 'exam_date' => now()->addDays(16)->toDateString()],
            ['name' => 'Software Engineering',          'color' => '#ef4444', 'progress' => 35, 'exam_date' => now()->addDays(20)->toDateString()],
            ['name' => 'Operating Systems',             'color' => '#ec4899', 'progress' => 50, 'exam_date' => now()->addDays(23)->toDateString()],
            ['name' => 'Computer Networks',             'color' => '#14b8a6', 'progress' => 40, 'exam_date' => now()->addDays(26)->toDateString()],
        ];

        foreach ($courses as $data) {
            Course::factory()->for($user)->create($data);
        }
    }
}