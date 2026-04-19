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
                ['title' => 'Assignment 1: Array Problems',           'due_date' => '2026-04-05', 'completed' => true],
                ['title' => 'Assignment 2: Linked List Implementation','due_date' => '2026-04-12', 'completed' => false],
                ['title' => 'Assignment 3: Tree Traversal',           'due_date' => '2026-04-19', 'completed' => false],
                ['title' => 'Assignment 4: Sorting Challenge',        'due_date' => '2026-04-30', 'completed' => false],
            ],
            'Machine Learning' => [
                ['title' => 'Lab 1: Linear Regression',               'due_date' => '2026-04-08', 'completed' => true],
                ['title' => 'Lab 2: Classification Models',           'due_date' => '2026-04-15', 'completed' => false],
                ['title' => 'Lab 3: Neural Network from Scratch',     'due_date' => '2026-04-28', 'completed' => false],
                ['title' => 'Final Project: ML Pipeline',             'due_date' => '2026-05-10', 'completed' => false],
            ],
            'Web Development' => [
                ['title' => 'Project 1: Portfolio Website',           'due_date' => '2026-04-10', 'completed' => true],
                ['title' => 'Project 2: Todo App',                    'due_date' => '2026-04-17', 'completed' => false],
                ['title' => 'Project 3: Full-Stack Blog',             'due_date' => '2026-05-01', 'completed' => false],
            ],
            'Database Systems' => [
                ['title' => 'HW 1: ER Diagram',                       'due_date' => '2026-04-14', 'completed' => false],
                ['title' => 'HW 2: SQL Queries',                      'due_date' => '2026-04-21', 'completed' => false],
            ],
            'Software Engineering' => [
                ['title' => 'SRS Document',                           'due_date' => '2026-04-20', 'completed' => false],
                ['title' => 'Design Document & UML',                  'due_date' => '2026-04-27', 'completed' => false],
            ],
        ];

        foreach ($assignments as $courseName => $courseAssignments) {
            $course = Course::where('name', $courseName)->first();
            foreach ($courseAssignments as $assignment) {
                Assignment::create(array_merge($assignment, ['course_id' => $course->id]));
            }
        }
    }
}