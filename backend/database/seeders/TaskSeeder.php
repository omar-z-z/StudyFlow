<?php

namespace Database\Seeders;

use App\Models\Course;
use App\Models\Task;
use App\Models\User;
use Illuminate\Database\Seeder;

class TaskSeeder extends Seeder
{
    public function run(): void
    {
        $user   = User::where('email', 'test@example.com')->first();
        $dsa    = Course::where('name', 'Data Structures & Algorithms')->first();
        $ml     = Course::where('name', 'Machine Learning')->first();
        $web    = Course::where('name', 'Web Development')->first();
        $db     = Course::where('name', 'Database Systems')->first();
        $se     = Course::where('name', 'Software Engineering')->first();

        $tasks = [
            ['title' => 'Read Chapter 4: Stacks and Queues',       'course_id' => $dsa->id, 'completed' => false, 'estimated_time' => 45,  'priority' => 'high',   'type' => 'reading',  'date' => '2026-04-19'],
            ['title' => 'Watch Lecture 7: Stack Implementation',    'course_id' => $dsa->id, 'completed' => false, 'estimated_time' => 60,  'priority' => 'high',   'type' => 'lecture',  'date' => '2026-04-19'],
            ['title' => 'Solve exercises 15-20',                    'course_id' => $dsa->id, 'completed' => false, 'estimated_time' => 90,  'priority' => 'medium', 'type' => 'exercise', 'date' => '2026-04-19'],
            ['title' => 'Read Chapter 3: Logistic Regression',      'course_id' => $ml->id,  'completed' => true,  'estimated_time' => 50,  'priority' => 'medium', 'type' => 'reading',  'date' => '2026-04-19'],
            ['title' => 'Review React Hooks documentation',         'course_id' => $web->id, 'completed' => true,  'estimated_time' => 30,  'priority' => 'low',    'type' => 'review',   'date' => '2026-04-19'],
            ['title' => 'Watch Lecture 8: Neural Networks',         'course_id' => $ml->id,  'completed' => false, 'estimated_time' => 75,  'priority' => 'high',   'type' => 'lecture',  'date' => '2026-04-20'],
            ['title' => 'Complete Lab 2 exercises',                  'course_id' => $ml->id,  'completed' => false, 'estimated_time' => 120, 'priority' => 'high',   'type' => 'exercise', 'date' => '2026-04-20'],
            ['title' => 'Read Chapter 5: Trees',                    'course_id' => $dsa->id, 'completed' => false, 'estimated_time' => 60,  'priority' => 'medium', 'type' => 'reading',  'date' => '2026-04-20'],
            ['title' => 'Practice SQL JOIN queries',                'course_id' => $db->id,  'completed' => false, 'estimated_time' => 40,  'priority' => 'medium', 'type' => 'exercise', 'date' => '2026-04-20'],
            ['title' => 'Draw UML class diagram for project',       'course_id' => $se->id,  'completed' => false, 'estimated_time' => 50,  'priority' => 'high',   'type' => 'exercise', 'date' => '2026-04-21'],
            ['title' => 'Implement Binary Search Tree',             'course_id' => $dsa->id, 'completed' => false, 'estimated_time' => 90,  'priority' => 'high',   'type' => 'exercise', 'date' => '2026-04-21'],
            ['title' => 'Study Normalization (1NF to 3NF)',         'course_id' => $db->id,  'completed' => false, 'estimated_time' => 45,  'priority' => 'medium', 'type' => 'reading',  'date' => '2026-04-22'],
        ];

        foreach ($tasks as $task) {
            Task::create(array_merge($task, ['user_id' => $user->id]));
        }
    }
}