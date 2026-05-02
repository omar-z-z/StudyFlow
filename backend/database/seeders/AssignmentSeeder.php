<?php

namespace Database\Seeders;

use App\Models\Assignment;
use App\Models\Course;
use Illuminate\Database\Seeder;

class AssignmentSeeder extends Seeder
{
    public function run(): void
    {
        $p = fn(int $days) => now()->subDays($days)->toDateString();
        $f = fn(int $days) => now()->addDays($days)->toDateString();

        $assignments = [

            'Data Structures & Algorithms' => [
                ['title' => 'Assignment 1: Array & Complexity Analysis',        'due_date' => $p(53), 'completed' => true],
                ['title' => 'Assignment 2: Linked List Implementation',         'due_date' => $p(39), 'completed' => true],
                ['title' => 'Assignment 3: Stack & Queue Problems',             'due_date' => $p(25), 'completed' => true],
                ['title' => 'Assignment 4: Hash Table Design',                  'due_date' => $p(11), 'completed' => false],
                ['title' => 'Assignment 5: Binary Search Tree Operations',      'due_date' => $f(3),  'completed' => false],
                ['title' => 'Assignment 6: Graph Traversal Problems',           'due_date' => $f(10), 'completed' => false],
                ['title' => 'Final Project: Algorithm Visualizer',              'due_date' => $f(18), 'completed' => false],
            ],

            'Machine Learning' => [
                ['title' => 'Lab 1: Data Preprocessing & EDA',                 'due_date' => $p(51), 'completed' => true],
                ['title' => 'Lab 2: Linear Regression from Scratch',           'due_date' => $p(37), 'completed' => true],
                ['title' => 'Lab 3: Classification with Logistic Regression',  'due_date' => $p(23), 'completed' => true],
                ['title' => 'Lab 4: Decision Trees & Random Forests',          'due_date' => $p(9),  'completed' => false],
                ['title' => 'Lab 5: Neural Network from Scratch (NumPy)',       'due_date' => $f(5),  'completed' => false],
                ['title' => 'Lab 6: CNN for Image Classification',             'due_date' => $f(12), 'completed' => false],
                ['title' => 'Final Project: End-to-End ML Pipeline',           'due_date' => $f(19), 'completed' => false],
            ],

            'Web Development' => [
                ['title' => 'Project 1: Responsive Portfolio Website',         'due_date' => $p(48), 'completed' => true],
                ['title' => 'Project 2: JavaScript To-Do App',                 'due_date' => $p(34), 'completed' => true],
                ['title' => 'Project 3: React Weather App (API Integration)',  'due_date' => $p(20), 'completed' => true],
                ['title' => 'Project 4: Full-Stack Blog with Auth',            'due_date' => $p(6),  'completed' => false],
                ['title' => 'Project 5: E-Commerce Frontend (Next.js)',        'due_date' => $f(8),  'completed' => false],
                ['title' => 'Final Project: Full-Stack Web Application',       'due_date' => $f(20), 'completed' => false],
            ],

            'Database Systems' => [
                ['title' => 'HW 1: ER Diagram for University System',          'due_date' => $p(46), 'completed' => true],
                ['title' => 'HW 2: SQL Basics — SELECT & Filtering',           'due_date' => $p(32), 'completed' => true],
                ['title' => 'HW 3: Advanced SQL — Joins & Subqueries',         'due_date' => $p(18), 'completed' => true],
                ['title' => 'HW 4: Normalization up to BCNF',                  'due_date' => $p(4),  'completed' => false],
                ['title' => 'HW 5: Indexing & Query Optimization Report',      'due_date' => $f(9),  'completed' => false],
                ['title' => 'Final Project: Database Design & Implementation', 'due_date' => $f(17), 'completed' => false],
            ],

            'Software Engineering' => [
                ['title' => 'Deliverable 1: Project Proposal',                 'due_date' => $p(43), 'completed' => true],
                ['title' => 'Deliverable 2: SRS Document (IEEE Format)',        'due_date' => $p(29), 'completed' => true],
                ['title' => 'Deliverable 3: UML Design Diagrams',              'due_date' => $p(15), 'completed' => false],
                ['title' => 'Deliverable 4: Design Patterns Report',           'due_date' => $p(2),  'completed' => false],
                ['title' => 'Deliverable 5: Testing Plan & Test Cases',        'due_date' => $f(11), 'completed' => false],
                ['title' => 'Final Deliverable: Complete Project Submission',  'due_date' => $f(20), 'completed' => false],
            ],

            'Operating Systems' => [
                ['title' => 'Assignment 1: Process Scheduling Simulation',     'due_date' => $p(41), 'completed' => true],
                ['title' => 'Assignment 2: Thread Synchronization (Mutex)',    'due_date' => $p(27), 'completed' => true],
                ['title' => 'Assignment 3: Deadlock Detection Algorithm',      'due_date' => $p(13), 'completed' => false],
                ['title' => 'Assignment 4: Memory Allocation Simulator',       'due_date' => $f(1),  'completed' => false],
                ['title' => 'Assignment 5: File System Implementation',        'due_date' => $f(15), 'completed' => false],
                ['title' => 'Final Project: Mini Shell (C/C++)',               'due_date' => $f(22), 'completed' => false],
            ],

            'Computer Networks' => [
                ['title' => 'Lab 1: Wireshark Packet Analysis',                'due_date' => $p(45), 'completed' => true],
                ['title' => 'Lab 2: Subnetting & IP Addressing Exercises',     'due_date' => $p(31), 'completed' => true],
                ['title' => 'Lab 3: Routing Simulation (Packet Tracer)',       'due_date' => $p(10), 'completed' => false],
                ['title' => 'Lab 4: TCP Connection Analysis',                  'due_date' => $f(4),  'completed' => false],
                ['title' => 'Lab 5: Network Security & Firewall Rules',        'due_date' => $f(18), 'completed' => false],
                ['title' => 'Final Project: Network Design for a Campus',      'due_date' => $f(24), 'completed' => false],
            ],
        ];

        foreach ($assignments as $courseName => $courseAssignments) {
            $course = Course::where('name', $courseName)->first();
            if (! $course) continue;

            foreach ($courseAssignments as $data) {
                Assignment::factory()->create(array_merge($data, [
                    'course_id' => $course->id,
                ]));
            }
        }
    }
}