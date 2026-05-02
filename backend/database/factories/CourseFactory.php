<?php

namespace Database\Factories;

use App\Models\Course;
use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;


class CourseFactory extends Factory
{

    private static array $colors = [
        '#3b82f6', '#10b981', '#f59e0b',
        '#8b5cf6', '#ef4444', '#ec4899',
        '#14b8a6', '#f97316', '#6366f1',
    ];

    public function definition(): array
    {
        return [
            'user_id'   => User::factory(), // creates a user if none provided
            'name'      => $this->faker->randomElement([
                'Data Structures & Algorithms',
                'Machine Learning',
                'Web Development',
                'Database Systems',
                'Software Engineering',
                'Operating Systems',
                'Computer Networks',
                'Artificial Intelligence',
                'Mobile Development',
            ]),
            'color'     => $this->faker->randomElement(self::$colors),
            'progress'  => $this->faker->numberBetween(10, 95),
            'exam_date' => now()->addDays($this->faker->numberBetween(7, 60))->toDateString(),
        ];
    }
}
