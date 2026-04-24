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

        $dsa = Course::where('name', 'Data Structures & Algorithms')->first();
        $ml  = Course::where('name', 'Machine Learning')->first();
        $web = Course::where('name', 'Web Development')->first();
        $db  = Course::where('name', 'Database Systems')->first();
        $se  = Course::where('name', 'Software Engineering')->first();
        $os  = Course::where('name', 'Operating Systems')->first();
        $net = Course::where('name', 'Computer Networks')->first();

        $tasks = [

            ['title' => 'Review Big O Notation notes',                  'course_id' => $dsa->id, 'completed' => true,  'estimated_time' => 30,  'priority' => 'medium', 'type' => 'review',   'date' => '2026-04-22'],
            ['title' => 'Read Chapter 3: Logistic Regression',          'course_id' => $ml->id,  'completed' => true,  'estimated_time' => 50,  'priority' => 'medium', 'type' => 'reading',  'date' => '2026-04-22'],
            ['title' => 'Watch Lecture: React Router v6',               'course_id' => $web->id, 'completed' => true,  'estimated_time' => 45,  'priority' => 'low',    'type' => 'lecture',  'date' => '2026-04-22'],
            ['title' => 'Practice SQL JOIN queries',                    'course_id' => $db->id,  'completed' => true,  'estimated_time' => 40,  'priority' => 'medium', 'type' => 'exercise', 'date' => '2026-04-22'],

            ['title' => 'Solve Hash Table problems on LeetCode',        'course_id' => $dsa->id, 'completed' => true,  'estimated_time' => 75,  'priority' => 'high',   'type' => 'exercise', 'date' => '2026-04-23'],
            ['title' => 'Study Decision Trees concept',                 'course_id' => $ml->id,  'completed' => true,  'estimated_time' => 55,  'priority' => 'medium', 'type' => 'reading',  'date' => '2026-04-23'],
            ['title' => 'Draw ER Diagram for DB project',               'course_id' => $db->id,  'completed' => true,  'estimated_time' => 60,  'priority' => 'high',   'type' => 'exercise', 'date' => '2026-04-23'],
            ['title' => 'Read about CPU Scheduling Algorithms',         'course_id' => $os->id,  'completed' => false, 'estimated_time' => 45,  'priority' => 'medium', 'type' => 'reading',  'date' => '2026-04-23'],

            ['title' => 'Read Chapter 4: Binary Search Tree',          'course_id' => $dsa->id, 'completed' => false, 'estimated_time' => 60,  'priority' => 'high',   'type' => 'reading',  'date' => '2026-04-24'],
            ['title' => 'Watch Lecture 9: Tree Traversal',             'course_id' => $dsa->id, 'completed' => false, 'estimated_time' => 55,  'priority' => 'high',   'type' => 'lecture',  'date' => '2026-04-24'],
            ['title' => 'Complete Lab 4: Random Forest Classifier',    'course_id' => $ml->id,  'completed' => false, 'estimated_time' => 120, 'priority' => 'high',   'type' => 'exercise', 'date' => '2026-04-24'],
            ['title' => 'Review State Management in React',            'course_id' => $web->id, 'completed' => true,  'estimated_time' => 40,  'priority' => 'medium', 'type' => 'review',   'date' => '2026-04-24'],
            ['title' => 'Study Normalization (BCNF)',                  'course_id' => $db->id,  'completed' => false, 'estimated_time' => 45,  'priority' => 'medium', 'type' => 'reading',  'date' => '2026-04-24'],
            ['title' => 'Start UML Class Diagrams for SE project',     'course_id' => $se->id,  'completed' => false, 'estimated_time' => 50,  'priority' => 'high',   'type' => 'exercise', 'date' => '2026-04-24'],
            ['title' => 'Read about Deadlocks & Detection',            'course_id' => $os->id,  'completed' => false, 'estimated_time' => 40,  'priority' => 'medium', 'type' => 'reading',  'date' => '2026-04-24'],

            ['title' => 'Implement Binary Search Tree in code',        'course_id' => $dsa->id, 'completed' => false, 'estimated_time' => 90,  'priority' => 'high',   'type' => 'exercise', 'date' => '2026-04-25'],
            ['title' => 'Watch Lecture: SVM Explained',                'course_id' => $ml->id,  'completed' => false, 'estimated_time' => 60,  'priority' => 'medium', 'type' => 'lecture',  'date' => '2026-04-25'],
            ['title' => 'Build Auth pages in Next.js project',         'course_id' => $web->id, 'completed' => false, 'estimated_time' => 90,  'priority' => 'high',   'type' => 'exercise', 'date' => '2026-04-25'],
            ['title' => 'Review Indexing strategies in DB',            'course_id' => $db->id,  'completed' => false, 'estimated_time' => 35,  'priority' => 'medium', 'type' => 'review',   'date' => '2026-04-25'],
            ['title' => 'Practice Subnetting examples',                'course_id' => $net->id, 'completed' => false, 'estimated_time' => 45,  'priority' => 'medium', 'type' => 'exercise', 'date' => '2026-04-25'],

            ['title' => 'Solve Graph problems: BFS & DFS',             'course_id' => $dsa->id, 'completed' => false, 'estimated_time' => 80,  'priority' => 'high',   'type' => 'exercise', 'date' => '2026-04-26'],
            ['title' => 'Write summary of Design Patterns (SE)',       'course_id' => $se->id,  'completed' => false, 'estimated_time' => 60,  'priority' => 'high',   'type' => 'reading',  'date' => '2026-04-26'],
            ['title' => 'Read Chapter 5: Process Synchronization',     'course_id' => $os->id,  'completed' => false, 'estimated_time' => 50,  'priority' => 'medium', 'type' => 'reading',  'date' => '2026-04-26'],
            ['title' => 'Watch Lecture: IP Routing Algorithms',        'course_id' => $net->id, 'completed' => false, 'estimated_time' => 55,  'priority' => 'medium', 'type' => 'lecture',  'date' => '2026-04-26'],
            ['title' => 'Review TypeScript generics and types',        'course_id' => $web->id, 'completed' => false, 'estimated_time' => 35,  'priority' => 'low',    'type' => 'review',   'date' => '2026-04-26'],

            ['title' => 'Study Heap & Priority Queue',                 'course_id' => $dsa->id, 'completed' => false, 'estimated_time' => 60,  'priority' => 'medium', 'type' => 'reading',  'date' => '2026-04-27'],
            ['title' => 'Start Neural Network Lab (NumPy only)',       'course_id' => $ml->id,  'completed' => false, 'estimated_time' => 120, 'priority' => 'high',   'type' => 'exercise', 'date' => '2026-04-27'],
            ['title' => 'Complete UML Diagrams for SE project',        'course_id' => $se->id,  'completed' => false, 'estimated_time' => 70,  'priority' => 'high',   'type' => 'exercise', 'date' => '2026-04-27'],
            ['title' => 'Read about TCP Congestion Control',           'course_id' => $net->id, 'completed' => false, 'estimated_time' => 40,  'priority' => 'medium', 'type' => 'reading',  'date' => '2026-04-27'],

            ['title' => 'Solve Sorting algorithm problems',            'course_id' => $dsa->id, 'completed' => false, 'estimated_time' => 75,  'priority' => 'high',   'type' => 'exercise', 'date' => '2026-04-28'],
            ['title' => 'Work on DB Normalization HW 4',               'course_id' => $db->id,  'completed' => false, 'estimated_time' => 80,  'priority' => 'high',   'type' => 'exercise', 'date' => '2026-04-28'],
            ['title' => 'Watch Lecture: Memory Paging & Segmentation', 'course_id' => $os->id,  'completed' => false, 'estimated_time' => 60,  'priority' => 'medium', 'type' => 'lecture',  'date' => '2026-04-28'],
            ['title' => 'Review Random Forest model results',          'course_id' => $ml->id,  'completed' => false, 'estimated_time' => 45,  'priority' => 'low',    'type' => 'review',   'date' => '2026-04-28'],

            ['title' => 'Study Dynamic Programming: Memoization',      'course_id' => $dsa->id, 'completed' => false, 'estimated_time' => 90,  'priority' => 'high',   'type' => 'reading',  'date' => '2026-04-29'],
            ['title' => 'Watch Lecture: DNS & Application Layer',      'course_id' => $net->id, 'completed' => false, 'estimated_time' => 50,  'priority' => 'medium', 'type' => 'lecture',  'date' => '2026-04-29'],
            ['title' => 'Review SE Design Patterns notes',             'course_id' => $se->id,  'completed' => false, 'estimated_time' => 40,  'priority' => 'medium', 'type' => 'review',   'date' => '2026-04-29'],
            ['title' => 'Practice building a REST API in Next.js',     'course_id' => $web->id, 'completed' => false, 'estimated_time' => 90,  'priority' => 'high',   'type' => 'exercise', 'date' => '2026-04-29'],

            ['title' => 'Solve Dynamic Programming problems',          'course_id' => $dsa->id, 'completed' => false, 'estimated_time' => 90,  'priority' => 'high',   'type' => 'exercise', 'date' => '2026-04-30'],
            ['title' => 'Watch CNN Lecture & take notes',              'course_id' => $ml->id,  'completed' => false, 'estimated_time' => 70,  'priority' => 'high',   'type' => 'lecture',  'date' => '2026-04-30'],
            ['title' => 'Study Virtual Memory & Page Replacement',     'course_id' => $os->id,  'completed' => false, 'estimated_time' => 55,  'priority' => 'medium', 'type' => 'reading',  'date' => '2026-04-30'],
            ['title' => 'Write DB query optimization report draft',    'course_id' => $db->id,  'completed' => false, 'estimated_time' => 60,  'priority' => 'medium', 'type' => 'exercise', 'date' => '2026-04-30'],

            ['title' => 'Study Greedy Algorithms with examples',       'course_id' => $dsa->id, 'completed' => false, 'estimated_time' => 60,  'priority' => 'medium', 'type' => 'reading',  'date' => '2026-05-01'],
            ['title' => 'Practice Network Security concepts',          'course_id' => $net->id, 'completed' => false, 'estimated_time' => 50,  'priority' => 'medium', 'type' => 'review',   'date' => '2026-05-01'],
            ['title' => 'Start Final Web Development Project',         'course_id' => $web->id, 'completed' => false, 'estimated_time' => 120, 'priority' => 'high',   'type' => 'exercise', 'date' => '2026-05-01'],
            ['title' => 'Review Testing Strategies (SE)',              'course_id' => $se->id,  'completed' => false, 'estimated_time' => 40,  'priority' => 'medium', 'type' => 'review',   'date' => '2026-05-01'],

        ];

        foreach ($tasks as $task) {
            Task::create(array_merge($task, ['user_id' => $user->id]));
        }
    }
}