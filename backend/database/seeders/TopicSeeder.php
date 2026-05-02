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
                ['week' => 1, 'title' => 'Introduction to Algorithms',          'completed' => true],
                ['week' => 1, 'title' => 'Big O Notation & Complexity',         'completed' => true],
                ['week' => 2, 'title' => 'Arrays and Dynamic Arrays',           'completed' => true],
                ['week' => 2, 'title' => 'Singly & Doubly Linked Lists',        'completed' => true],
                ['week' => 3, 'title' => 'Stacks and Queues',                   'completed' => true],
                ['week' => 3, 'title' => 'Hash Tables & Collision Handling',    'completed' => true],
                ['week' => 4, 'title' => 'Binary Trees & BST',                  'completed' => false],
                ['week' => 4, 'title' => 'Tree Traversal Algorithms',           'completed' => false],
                ['week' => 5, 'title' => 'Heaps & Priority Queues',             'completed' => false],
                ['week' => 5, 'title' => 'Graphs: BFS & DFS',                  'completed' => false],
                ['week' => 6, 'title' => 'Shortest Path: Dijkstra & Bellman',  'completed' => false],
                ['week' => 6, 'title' => 'Sorting: Merge, Quick, Heap Sort',   'completed' => false],
                ['week' => 7, 'title' => 'Divide and Conquer',                  'completed' => false],
                ['week' => 7, 'title' => 'Dynamic Programming Fundamentals',   'completed' => false],
                ['week' => 8, 'title' => 'Greedy Algorithms',                   'completed' => false],
                ['week' => 8, 'title' => 'Backtracking & Recursion',            'completed' => false],
            ],

            'Machine Learning' => [
                ['week' => 1, 'title' => 'Introduction to ML & Types',          'completed' => true],
                ['week' => 1, 'title' => 'Data Preprocessing & Cleaning',       'completed' => true],
                ['week' => 2, 'title' => 'Linear Regression',                   'completed' => true],
                ['week' => 2, 'title' => 'Gradient Descent',                    'completed' => true],
                ['week' => 3, 'title' => 'Logistic Regression',                 'completed' => true],
                ['week' => 3, 'title' => 'Model Evaluation & Metrics',          'completed' => false],
                ['week' => 4, 'title' => 'Decision Trees & Random Forests',     'completed' => false],
                ['week' => 4, 'title' => 'Support Vector Machines',             'completed' => false],
                ['week' => 5, 'title' => 'K-Nearest Neighbors & Naive Bayes',  'completed' => false],
                ['week' => 5, 'title' => 'Clustering: K-Means & DBSCAN',       'completed' => false],
                ['week' => 6, 'title' => 'Neural Networks Basics',              'completed' => false],
                ['week' => 6, 'title' => 'Backpropagation',                     'completed' => false],
                ['week' => 7, 'title' => 'Convolutional Neural Networks',       'completed' => false],
                ['week' => 7, 'title' => 'Recurrent Neural Networks & LSTM',   'completed' => false],
                ['week' => 8, 'title' => 'Transfer Learning & Fine-Tuning',    'completed' => false],
                ['week' => 8, 'title' => 'Model Deployment Basics',             'completed' => false],
            ],

            'Web Development' => [
                ['week' => 1, 'title' => 'HTML5 & Semantic Markup',             'completed' => true],
                ['week' => 1, 'title' => 'CSS3 & Flexbox / Grid',               'completed' => true],
                ['week' => 2, 'title' => 'JavaScript ES6+ Fundamentals',        'completed' => true],
                ['week' => 2, 'title' => 'DOM Manipulation & Events',           'completed' => true],
                ['week' => 3, 'title' => 'Async JS: Promises & async/await',   'completed' => true],
                ['week' => 3, 'title' => 'React: Components & JSX',             'completed' => true],
                ['week' => 4, 'title' => 'React Hooks (useState, useEffect)',   'completed' => true],
                ['week' => 4, 'title' => 'React Router & Navigation',           'completed' => true],
                ['week' => 5, 'title' => 'State Management (Context / Redux)',  'completed' => false],
                ['week' => 5, 'title' => 'Next.js & Server-Side Rendering',    'completed' => false],
                ['week' => 6, 'title' => 'TypeScript for React',                'completed' => false],
                ['week' => 6, 'title' => 'REST APIs & Fetch / Axios',          'completed' => false],
                ['week' => 7, 'title' => 'Backend Basics with Node & Express', 'completed' => false],
                ['week' => 7, 'title' => 'Authentication: JWT & Sessions',     'completed' => false],
                ['week' => 8, 'title' => 'Deployment: Vercel & Railway',        'completed' => false],
                ['week' => 8, 'title' => 'Web Performance & Optimization',      'completed' => false],
            ],

            'Database Systems' => [
                ['week' => 1, 'title' => 'Relational Model & Concepts',         'completed' => true],
                ['week' => 1, 'title' => 'SQL Basics: SELECT, INSERT, UPDATE',  'completed' => true],
                ['week' => 2, 'title' => 'Advanced SQL: Joins & Subqueries',    'completed' => true],
                ['week' => 2, 'title' => 'Aggregate Functions & GROUP BY',      'completed' => true],
                ['week' => 3, 'title' => 'Normalization: 1NF, 2NF, 3NF',       'completed' => true],
                ['week' => 3, 'title' => 'Entity-Relationship Diagrams',        'completed' => false],
                ['week' => 4, 'title' => 'Indexing & Query Optimization',       'completed' => false],
                ['week' => 4, 'title' => 'Transactions & ACID Properties',      'completed' => false],
                ['week' => 5, 'title' => 'Concurrency Control & Locking',       'completed' => false],
                ['week' => 5, 'title' => 'NoSQL & Document Databases',          'completed' => false],
                ['week' => 6, 'title' => 'Database Security & Privileges',      'completed' => false],
                ['week' => 6, 'title' => 'Stored Procedures & Triggers',        'completed' => false],
            ],

            'Software Engineering' => [
                ['week' => 1, 'title' => 'Software Development Life Cycle',     'completed' => true],
                ['week' => 1, 'title' => 'Agile & Scrum Methodology',           'completed' => true],
                ['week' => 2, 'title' => 'Requirements Engineering',            'completed' => false],
                ['week' => 2, 'title' => 'Use Case Diagrams & User Stories',   'completed' => false],
                ['week' => 3, 'title' => 'UML: Class & Sequence Diagrams',     'completed' => false],
                ['week' => 3, 'title' => 'Design Patterns: Creational',         'completed' => false],
                ['week' => 4, 'title' => 'Design Patterns: Structural',         'completed' => false],
                ['week' => 4, 'title' => 'Design Patterns: Behavioral',         'completed' => false],
                ['week' => 5, 'title' => 'Software Architecture Styles',        'completed' => false],
                ['week' => 5, 'title' => 'Testing: Unit & Integration',         'completed' => false],
                ['week' => 6, 'title' => 'CI/CD & DevOps Basics',              'completed' => false],
                ['week' => 6, 'title' => 'Software Quality & Code Reviews',    'completed' => false],
            ],

            'Operating Systems' => [
                ['week' => 1, 'title' => 'OS Concepts & Structure',             'completed' => true],
                ['week' => 1, 'title' => 'Process Management',                  'completed' => true],
                ['week' => 2, 'title' => 'Threads & Concurrency',               'completed' => true],
                ['week' => 2, 'title' => 'CPU Scheduling Algorithms',           'completed' => true],
                ['week' => 3, 'title' => 'Process Synchronization',             'completed' => false],
                ['week' => 3, 'title' => 'Deadlocks & Prevention',              'completed' => false],
                ['week' => 4, 'title' => 'Memory Management & Paging',         'completed' => false],
                ['week' => 4, 'title' => 'Virtual Memory & Page Replacement',  'completed' => false],
                ['week' => 5, 'title' => 'File Systems & I/O Management',      'completed' => false],
                ['week' => 5, 'title' => 'Disk Scheduling',                     'completed' => false],
                ['week' => 6, 'title' => 'OS Security & Protection',            'completed' => false],
                ['week' => 6, 'title' => 'Virtualization & Containers',         'completed' => false],
            ],

            'Computer Networks' => [
                ['week' => 1, 'title' => 'Network Models: OSI & TCP/IP',        'completed' => true],
                ['week' => 1, 'title' => 'Physical Layer & Data Transmission',  'completed' => true],
                ['week' => 2, 'title' => 'Data Link Layer & MAC',               'completed' => true],
                ['week' => 2, 'title' => 'Ethernet & Switching',                'completed' => false],
                ['week' => 3, 'title' => 'IP Addressing & Subnetting',          'completed' => false],
                ['week' => 3, 'title' => 'Routing Algorithms',                  'completed' => false],
                ['week' => 4, 'title' => 'Transport Layer: TCP & UDP',          'completed' => false],
                ['week' => 4, 'title' => 'DNS, DHCP & NAT',                    'completed' => false],
                ['week' => 5, 'title' => 'Application Layer Protocols',         'completed' => false],
                ['week' => 5, 'title' => 'HTTP, HTTPS & TLS',                  'completed' => false],
                ['week' => 6, 'title' => 'Network Security & Firewalls',        'completed' => false],
                ['week' => 6, 'title' => 'Wireless Networks & WiFi',            'completed' => false],
            ],
        ];

        foreach ($topics as $courseName => $courseTopics) {
            $course = Course::where('name', $courseName)->first();
            if (! $course) continue;

            foreach ($courseTopics as $data) {
                Topic::factory()->create(array_merge($data, [
                    'course_id' => $course->id,
                ]));
            }
        }
    }
}