<?php

namespace Database\Factories;

use App\Models\Course;
use Illuminate\Database\Eloquent\Factories\Factory;

class AssignmentFactory extends Factory
{
    public function definition(): array
    {
        return [
            'course_id'  => Course::factory(),
            'title'      => $this->faker->sentence(4),
            'due_date'   => now()->addDays($this->faker->numberBetween(1, 60))->toDateString(),
            'completed'  => $this->faker->boolean(40),
        ];
    }
}