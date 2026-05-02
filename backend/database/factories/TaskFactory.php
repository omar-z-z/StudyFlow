<?php

namespace Database\Factories;

use App\Models\Course;
use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;

class TaskFactory extends Factory
{
    public function definition(): array
    {
        return [
            'user_id'        => User::factory(),
            'course_id'      => Course::factory(),
            'title'          => $this->faker->sentence(5),
            'completed'      => $this->faker->boolean(30),
            'estimated_time' => $this->faker->randomElement([30, 40, 45, 50, 55, 60, 75, 90, 120]),
            'priority'       => $this->faker->randomElement(['low', 'medium', 'high']),
            'type'           => $this->faker->randomElement(['review', 'reading', 'lecture', 'exercise']),
            'date'           => now()->addDays($this->faker->numberBetween(-10, 10))->toDateString(),
        ];
    }
}