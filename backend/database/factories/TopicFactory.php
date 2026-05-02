<?php

namespace Database\Factories;

use App\Models\Course;
use Illuminate\Database\Eloquent\Factories\Factory;

class TopicFactory extends Factory
{
    public function definition(): array
    {
        return [
            'course_id'  => Course::factory(),
            'week'       => $this->faker->numberBetween(1, 8),
            'title'      => $this->faker->sentence(3),
            'completed'  => $this->faker->boolean(30),
        ];
    }
}