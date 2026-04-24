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
                'progress'  => 62,
                'exam_date' => '2026-05-15',
            ],
            [
                'name'      => 'Machine Learning',
                'color'     => '#10b981',
                'progress'  => 45,
                'exam_date' => '2026-05-20',
            ],
            [
                'name'      => 'Web Development',
                'color'     => '#f59e0b',
                'progress'  => 78,
                'exam_date' => '2026-05-12',
            ],
            [
                'name'      => 'Database Systems',
                'color'     => '#8b5cf6',
                'progress'  => 55,
                'exam_date' => '2026-05-18',
            ],
            [
                'name'      => 'Software Engineering',
                'color'     => '#ef4444',
                'progress'  => 35,
                'exam_date' => '2026-05-22',
            ],
            [
                'name'      => 'Operating Systems',
                'color'     => '#ec4899',
                'progress'  => 50,
                'exam_date' => '2026-05-25',
            ],
            [
                'name'      => 'Computer Networks',
                'color'     => '#14b8a6',
                'progress'  => 40,
                'exam_date' => '2026-05-28',
            ],
        ];

        foreach ($courses as $course) {
            Course::create(array_merge($course, ['user_id' => $user->id]));
        }
    }
}