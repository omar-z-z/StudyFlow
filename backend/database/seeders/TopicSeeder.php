<?php

namespace Database\Seeders;

use App\Models\Course;
use App\Models\Topic;
use Illuminate\Database\Seeder;

class TopicSeeder extends Seeder
{
    public function run(): void
    {
        $topics = [
            'Data Structures & Algorithms' => [
                ['week' => 1, 'title' => 'Introduction to Algorithms',  'completed' => true],
                ['week' => 1, 'title' => 'Big O Notation',              'completed' => true],
                ['week' => 2, 'title' => 'Arrays and Linked Lists',     'completed' => true],
                ['week' => 2, 'title' => 'Stacks and Queues',           'completed' => false],
                ['week' => 3, 'title' => 'Trees and Graphs',            'completed' => false],
                ['week' => 3, 'title' => 'Sorting Algorithms',          'completed' => false],
                ['week' => 4, 'title' => 'Dynamic Programming',         'completed' => false],
                ['week' => 4, 'title' => 'Greedy Algorithms',           'completed' => false],
            ],
            'Machine Learning' => [
                ['week' => 1, 'title' => 'Introduction to ML',          'completed' => true],
                ['week' => 1, 'title' => 'Linear Regression',           'completed' => true],
                ['week' => 2, 'title' => 'Logistic Regression',         'completed' => false],
                ['week' => 2, 'title' => 'Neural Networks Basics',      'completed' => false],
                ['week' => 3, 'title' => 'Deep Learning',               'completed' => false],
                ['week' => 3, 'title' => 'Convolutional Neural Nets',   'completed' => false],
                ['week' => 4, 'title' => 'Model Evaluation & Tuning',   'completed' => false],
            ],
            'Web Development' => [
                ['week' => 1, 'title' => 'HTML & CSS Fundamentals',     'completed' => true],
                ['week' => 1, 'title' => 'JavaScript Basics',           'completed' => true],
                ['week' => 2, 'title' => 'React Framework',             'completed' => true],
                ['week' => 2, 'title' => 'State Management',            'completed' => false],
                ['week' => 3, 'title' => 'Backend with Node.js',        'completed' => false],
                ['week' => 3, 'title' => 'REST APIs',                   'completed' => false],
                ['week' => 4, 'title' => 'Authentication & Security',   'completed' => false],
            ],
            'Database Systems' => [
                ['week' => 1, 'title' => 'Relational Model',            'completed' => true],
                ['week' => 1, 'title' => 'SQL Basics',                  'completed' => true],
                ['week' => 2, 'title' => 'Joins and Subqueries',        'completed' => false],
                ['week' => 2, 'title' => 'Normalization',               'completed' => false],
                ['week' => 3, 'title' => 'Transactions & Indexing',     'completed' => false],
            ],
            'Software Engineering' => [
                ['week' => 1, 'title' => 'SDLC Models',                 'completed' => true],
                ['week' => 1, 'title' => 'Requirements Engineering',    'completed' => false],
                ['week' => 2, 'title' => 'UML Diagrams',                'completed' => false],
                ['week' => 2, 'title' => 'Design Patterns',             'completed' => false],
                ['week' => 3, 'title' => 'Testing Strategies',          'completed' => false],
            ],
        ];

        foreach ($topics as $courseName => $courseTopics) {
            $course = Course::where('name', $courseName)->first();
            foreach ($courseTopics as $topic) {
                Topic::create(array_merge($topic, ['course_id' => $course->id]));
            }
        }
    }
}