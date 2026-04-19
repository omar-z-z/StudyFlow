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
            [
                'name'      => 'Data Structures & Algorithms',
                'color'     => '#3b82f6',
                'progress'  => 65,
                'exam_date' => '2026-04-25',
            ],
            [
                'name'      => 'Machine Learning',
                'color'     => '#10b981',
                'progress'  => 40,
                'exam_date' => '2026-04-28',
            ],
            [
                'name'      => 'Web Development',
                'color'     => '#f59e0b',
                'progress'  => 75,
                'exam_date' => '2026-04-22',
            ],
            [
                'name'      => 'Database Systems',
                'color'     => '#8b5cf6',
                'progress'  => 50,
                'exam_date' => '2026-05-02',
            ],
            [
                'name'      => 'Software Engineering',
                'color'     => '#ef4444',
                'progress'  => 30,
                'exam_date' => '2026-05-05',
            ],
        ];

        foreach ($courses as $course) {
            Course::create(array_merge($course, ['user_id' => $user->id]));
        }
    }
}