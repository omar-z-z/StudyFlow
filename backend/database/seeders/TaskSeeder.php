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
        $user = User::where('email', 'test@example.com')->first();

        $dsa = Course::where('name', 'Data Structures & Algorithms')->value('id');
        $ml  = Course::where('name', 'Machine Learning')->value('id');
        $web = Course::where('name', 'Web Development')->value('id');
        $db  = Course::where('name', 'Database Systems')->value('id');
        $se  = Course::where('name', 'Software Engineering')->value('id');
        $os  = Course::where('name', 'Operating Systems')->value('id');
        $net = Course::where('name', 'Computer Networks')->value('id');

        $p = fn(int $days) => now()->subDays($days)->toDateString();
        $f = fn(int $days) => now()->addDays($days)->toDateString();

        $tasks = [

            ['title' => 'Review Big O Notation notes',                  'course_id' => $dsa, 'completed' => true,  'estimated_time' => 30,  'priority' => 'medium', 'type' => 'review',   'date' => $p(10)],
            ['title' => 'Read Chapter 3: Logistic Regression',          'course_id' => $ml,  'completed' => true,  'estimated_time' => 50,  'priority' => 'medium', 'type' => 'reading',  'date' => $p(10)],
            ['title' => 'Watch Lecture: React Router v6',               'course_id' => $web, 'completed' => true,  'estimated_time' => 45,  'priority' => 'low',    'type' => 'lecture',  'date' => $p(10)],
            ['title' => 'Practice SQL JOIN queries',                    'course_id' => $db,  'completed' => true,  'estimated_time' => 40,  'priority' => 'medium', 'type' => 'exercise', 'date' => $p(10)],

            ['title' => 'Solve Hash Table problems on LeetCode',        'course_id' => $dsa, 'completed' => true,  'estimated_time' => 75,  'priority' => 'high',   'type' => 'exercise', 'date' => $p(9)],
            ['title' => 'Study Decision Trees concept',                 'course_id' => $ml,  'completed' => true,  'estimated_time' => 55,  'priority' => 'medium', 'type' => 'reading',  'date' => $p(9)],
            ['title' => 'Draw ER Diagram for DB project',               'course_id' => $db,  'completed' => true,  'estimated_time' => 60,  'priority' => 'high',   'type' => 'exercise', 'date' => $p(9)],
            ['title' => 'Read about CPU Scheduling Algorithms',         'course_id' => $os,  'completed' => false, 'estimated_time' => 45,  'priority' => 'medium', 'type' => 'reading',  'date' => $p(9)],

            ['title' => 'Read Chapter 4: Binary Search Tree',          'course_id' => $dsa, 'completed' => false, 'estimated_time' => 60,  'priority' => 'high',   'type' => 'reading',  'date' => $p(8)],
            ['title' => 'Watch Lecture 9: Tree Traversal',             'course_id' => $dsa, 'completed' => false, 'estimated_time' => 55,  'priority' => 'high',   'type' => 'lecture',  'date' => $p(8)],
            ['title' => 'Complete Lab 4: Random Forest Classifier',    'course_id' => $ml,  'completed' => false, 'estimated_time' => 120, 'priority' => 'high',   'type' => 'exercise', 'date' => $p(8)],
            ['title' => 'Review State Management in React',            'course_id' => $web, 'completed' => true,  'estimated_time' => 40,  'priority' => 'medium', 'type' => 'review',   'date' => $p(8)],
            ['title' => 'Study Normalization (BCNF)',                  'course_id' => $db,  'completed' => false, 'estimated_time' => 45,  'priority' => 'medium', 'type' => 'reading',  'date' => $p(8)],
            ['title' => 'Start UML Class Diagrams for SE project',     'course_id' => $se,  'completed' => false, 'estimated_time' => 50,  'priority' => 'high',   'type' => 'exercise', 'date' => $p(8)],
            ['title' => 'Read about Deadlocks & Detection',            'course_id' => $os,  'completed' => false, 'estimated_time' => 40,  'priority' => 'medium', 'type' => 'reading',  'date' => $p(8)],

            ['title' => 'Implement Binary Search Tree in code',        'course_id' => $dsa, 'completed' => false, 'estimated_time' => 90,  'priority' => 'high',   'type' => 'exercise', 'date' => $p(7)],
            ['title' => 'Watch Lecture: SVM Explained',                'course_id' => $ml,  'completed' => false, 'estimated_time' => 60,  'priority' => 'medium', 'type' => 'lecture',  'date' => $p(7)],
            ['title' => 'Build Auth pages in Next.js project',         'course_id' => $web, 'completed' => false, 'estimated_time' => 90,  'priority' => 'high',   'type' => 'exercise', 'date' => $p(7)],
            ['title' => 'Review Indexing strategies in DB',            'course_id' => $db,  'completed' => false, 'estimated_time' => 35,  'priority' => 'medium', 'type' => 'review',   'date' => $p(7)],
            ['title' => 'Practice Subnetting examples',                'course_id' => $net, 'completed' => false, 'estimated_time' => 45,  'priority' => 'medium', 'type' => 'exercise', 'date' => $p(7)],

            ['title' => 'Solve Graph problems: BFS & DFS',             'course_id' => $dsa, 'completed' => false, 'estimated_time' => 80,  'priority' => 'high',   'type' => 'exercise', 'date' => $p(6)],
            ['title' => 'Write summary of Design Patterns (SE)',       'course_id' => $se,  'completed' => false, 'estimated_time' => 60,  'priority' => 'high',   'type' => 'reading',  'date' => $p(6)],
            ['title' => 'Read Chapter 5: Process Synchronization',     'course_id' => $os,  'completed' => false, 'estimated_time' => 50,  'priority' => 'medium', 'type' => 'reading',  'date' => $p(6)],
            ['title' => 'Watch Lecture: IP Routing Algorithms',        'course_id' => $net, 'completed' => false, 'estimated_time' => 55,  'priority' => 'medium', 'type' => 'lecture',  'date' => $p(6)],
            ['title' => 'Review TypeScript generics and types',        'course_id' => $web, 'completed' => false, 'estimated_time' => 35,  'priority' => 'low',    'type' => 'review',   'date' => $p(6)],

            ['title' => 'Study Heap & Priority Queue',                 'course_id' => $dsa, 'completed' => false, 'estimated_time' => 60,  'priority' => 'medium', 'type' => 'reading',  'date' => $p(5)],
            ['title' => 'Start Neural Network Lab (NumPy only)',       'course_id' => $ml,  'completed' => false, 'estimated_time' => 120, 'priority' => 'high',   'type' => 'exercise', 'date' => $p(5)],
            ['title' => 'Complete UML Diagrams for SE project',        'course_id' => $se,  'completed' => false, 'estimated_time' => 70,  'priority' => 'high',   'type' => 'exercise', 'date' => $p(5)],
            ['title' => 'Read about TCP Congestion Control',           'course_id' => $net, 'completed' => false, 'estimated_time' => 40,  'priority' => 'medium', 'type' => 'reading',  'date' => $p(5)],

            ['title' => 'Solve Sorting algorithm problems',            'course_id' => $dsa, 'completed' => false, 'estimated_time' => 75,  'priority' => 'high',   'type' => 'exercise', 'date' => $p(4)],
            ['title' => 'Work on DB Normalization HW 4',               'course_id' => $db,  'completed' => false, 'estimated_time' => 80,  'priority' => 'high',   'type' => 'exercise', 'date' => $p(4)],
            ['title' => 'Watch Lecture: Memory Paging & Segmentation', 'course_id' => $os,  'completed' => false, 'estimated_time' => 60,  'priority' => 'medium', 'type' => 'lecture',  'date' => $p(4)],
            ['title' => 'Review Random Forest model results',          'course_id' => $ml,  'completed' => false, 'estimated_time' => 45,  'priority' => 'low',    'type' => 'review',   'date' => $p(4)],

            ['title' => 'Study Dynamic Programming: Memoization',      'course_id' => $dsa, 'completed' => false, 'estimated_time' => 90,  'priority' => 'high',   'type' => 'reading',  'date' => $p(3)],
            ['title' => 'Watch Lecture: DNS & Application Layer',      'course_id' => $net, 'completed' => false, 'estimated_time' => 50,  'priority' => 'medium', 'type' => 'lecture',  'date' => $p(3)],
            ['title' => 'Review SE Design Patterns notes',             'course_id' => $se,  'completed' => false, 'estimated_time' => 40,  'priority' => 'medium', 'type' => 'review',   'date' => $p(3)],
            ['title' => 'Practice building a REST API in Next.js',     'course_id' => $web, 'completed' => false, 'estimated_time' => 90,  'priority' => 'high',   'type' => 'exercise', 'date' => $p(3)],

            ['title' => 'Solve Dynamic Programming problems',          'course_id' => $dsa, 'completed' => false, 'estimated_time' => 90,  'priority' => 'high',   'type' => 'exercise', 'date' => $p(2)],
            ['title' => 'Watch CNN Lecture & take notes',              'course_id' => $ml,  'completed' => false, 'estimated_time' => 70,  'priority' => 'high',   'type' => 'lecture',  'date' => $p(2)],
            ['title' => 'Study Virtual Memory & Page Replacement',     'course_id' => $os,  'completed' => false, 'estimated_time' => 55,  'priority' => 'medium', 'type' => 'reading',  'date' => $p(2)],
            ['title' => 'Write DB query optimization report draft',    'course_id' => $db,  'completed' => false, 'estimated_time' => 60,  'priority' => 'medium', 'type' => 'exercise', 'date' => $p(2)],

            ['title' => 'Study Greedy Algorithms with examples',       'course_id' => $dsa, 'completed' => false, 'estimated_time' => 60,  'priority' => 'medium', 'type' => 'reading',  'date' => $p(1)],
            ['title' => 'Practice Network Security concepts',          'course_id' => $net, 'completed' => false, 'estimated_time' => 50,  'priority' => 'medium', 'type' => 'review',   'date' => $p(1)],
            ['title' => 'Start Final Web Development Project',         'course_id' => $web, 'completed' => false, 'estimated_time' => 120, 'priority' => 'high',   'type' => 'exercise', 'date' => $p(1)],
            ['title' => 'Review Testing Strategies (SE)',              'course_id' => $se,  'completed' => false, 'estimated_time' => 40,  'priority' => 'medium', 'type' => 'review',   'date' => $p(1)],
        ];

        foreach ($tasks as $data) {
            Task::factory()->create(array_merge($data, [
                'user_id' => $user->id,
            ]));
        }
    }
}