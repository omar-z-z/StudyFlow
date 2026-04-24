<?php

namespace Database\Seeders;

use App\Models\Assignment;
use App\Models\Course;
use Illuminate\Database\Seeder;

class AssignmentSeeder extends Seeder
{
    public function run(): void
    {
        $assignments = [

            'Data Structures & Algorithms' => [
                ['title' => 'Assignment 1: Array & Complexity Analysis',        'due_date' => '2026-03-10', 'completed' => true],
                ['title' => 'Assignment 2: Linked List Implementation',         'due_date' => '2026-03-24', 'completed' => true],
                ['title' => 'Assignment 3: Stack & Queue Problems',             'due_date' => '2026-04-07', 'completed' => true],
                ['title' => 'Assignment 4: Hash Table Design',                  'due_date' => '2026-04-21', 'completed' => false],
                ['title' => 'Assignment 5: Binary Search Tree Operations',      'due_date' => '2026-05-05', 'completed' => false],
                ['title' => 'Assignment 6: Graph Traversal Problems',           'due_date' => '2026-05-12', 'completed' => false],
                ['title' => 'Final Project: Algorithm Visualizer',              'due_date' => '2026-05-20', 'completed' => false],
            ],

            'Machine Learning' => [
                ['title' => 'Lab 1: Data Preprocessing & EDA',                 'due_date' => '2026-03-12', 'completed' => true],
                ['title' => 'Lab 2: Linear Regression from Scratch',           'due_date' => '2026-03-26', 'completed' => true],
                ['title' => 'Lab 3: Classification with Logistic Regression',  'due_date' => '2026-04-09', 'completed' => true],
                ['title' => 'Lab 4: Decision Trees & Random Forests',          'due_date' => '2026-04-23', 'completed' => false],
                ['title' => 'Lab 5: Neural Network from Scratch (NumPy)',       'due_date' => '2026-05-07', 'completed' => false],
                ['title' => 'Lab 6: CNN for Image Classification',             'due_date' => '2026-05-14', 'completed' => false],
                ['title' => 'Final Project: End-to-End ML Pipeline',           'due_date' => '2026-05-21', 'completed' => false],
            ],

            'Web Development' => [
                ['title' => 'Project 1: Responsive Portfolio Website',         'due_date' => '2026-03-15', 'completed' => true],
                ['title' => 'Project 2: JavaScript To-Do App',                 'due_date' => '2026-03-29', 'completed' => true],
                ['title' => 'Project 3: React Weather App (API Integration)',  'due_date' => '2026-04-12', 'completed' => true],
                ['title' => 'Project 4: Full-Stack Blog with Auth',            'due_date' => '2026-04-26', 'completed' => false],
                ['title' => 'Project 5: E-Commerce Frontend (Next.js)',        'due_date' => '2026-05-10', 'completed' => false],
                ['title' => 'Final Project: Full-Stack Web Application',       'due_date' => '2026-05-22', 'completed' => false],
            ],

            'Database Systems' => [
                ['title' => 'HW 1: ER Diagram for University System',          'due_date' => '2026-03-17', 'completed' => true],
                ['title' => 'HW 2: SQL Basics — SELECT & Filtering',           'due_date' => '2026-03-31', 'completed' => true],
                ['title' => 'HW 3: Advanced SQL — Joins & Subqueries',         'due_date' => '2026-04-14', 'completed' => true],
                ['title' => 'HW 4: Normalization up to BCNF',                  'due_date' => '2026-04-28', 'completed' => false],
                ['title' => 'HW 5: Indexing & Query Optimization Report',      'due_date' => '2026-05-11', 'completed' => false],
                ['title' => 'Final Project: Database Design & Implementation', 'due_date' => '2026-05-19', 'completed' => false],
            ],

            'Software Engineering' => [
                ['title' => 'Deliverable 1: Project Proposal',                 'due_date' => '2026-03-20', 'completed' => true],
                ['title' => 'Deliverable 2: SRS Document (IEEE Format)',        'due_date' => '2026-04-03', 'completed' => true],
                ['title' => 'Deliverable 3: UML Design Diagrams',              'due_date' => '2026-04-17', 'completed' => false],
                ['title' => 'Deliverable 4: Design Patterns Report',           'due_date' => '2026-04-30', 'completed' => false],
                ['title' => 'Deliverable 5: Testing Plan & Test Cases',        'due_date' => '2026-05-13', 'completed' => false],
                ['title' => 'Final Deliverable: Complete Project Submission',  'due_date' => '2026-05-22', 'completed' => false],
            ],

            'Operating Systems' => [
                ['title' => 'Assignment 1: Process Scheduling Simulation',     'due_date' => '2026-03-22', 'completed' => true],
                ['title' => 'Assignment 2: Thread Synchronization (Mutex)',    'due_date' => '2026-04-05', 'completed' => true],
                ['title' => 'Assignment 3: Deadlock Detection Algorithm',      'due_date' => '2026-04-19', 'completed' => false],
                ['title' => 'Assignment 4: Memory Allocation Simulator',       'due_date' => '2026-05-03', 'completed' => false],
                ['title' => 'Assignment 5: File System Implementation',        'due_date' => '2026-05-17', 'completed' => false],
                ['title' => 'Final Project: Mini Shell (C/C++)',               'due_date' => '2026-05-24', 'completed' => false],
            ],

            'Computer Networks' => [
                ['title' => 'Lab 1: Wireshark Packet Analysis',                'due_date' => '2026-03-18', 'completed' => true],
                ['title' => 'Lab 2: Subnetting & IP Addressing Exercises',     'due_date' => '2026-04-01', 'completed' => true],
                ['title' => 'Lab 3: Routing Simulation (Packet Tracer)',       'due_date' => '2026-04-22', 'completed' => false],
                ['title' => 'Lab 4: TCP Connection Analysis',                  'due_date' => '2026-05-06', 'completed' => false],
                ['title' => 'Lab 5: Network Security & Firewall Rules',        'due_date' => '2026-05-20', 'completed' => false],
                ['title' => 'Final Project: Network Design for a Campus',      'due_date' => '2026-05-26', 'completed' => false],
            ],
        ];

        foreach ($assignments as $courseName => $courseAssignments) {
            $course = Course::where('name', $courseName)->first();
            if (! $course) continue;

            foreach ($courseAssignments as $assignment) {
                Assignment::create(array_merge($assignment, ['course_id' => $course->id]));
            }
        }
    }
}