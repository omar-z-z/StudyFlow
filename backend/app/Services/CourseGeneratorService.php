<?php

namespace App\Services;

use Illuminate\Support\Facades\Http;
use Illuminate\Support\Str;
use Exception;
use Mockery\Undefined;

class CourseGeneratorService
{
    // ─── Swap this method body to change AI provider ───────────────────

    private function callAI(string $prompt): string
    {
        // ── OpenAI ──────────────────────────────────────────────────────
        try {
            $response = Http::withToken(config('services.openai.key'))
                ->timeout(60)
                ->post('https://api.openai.com/v1/chat/completions', [
                    'model'       => 'gpt-4o-mini',   // cheap and fast, swap to gpt-4o if needed
                    'temperature' => 0.3,
                    'messages'    => [
                        [
                            'role'    => 'system',
                            'content' => 'You are an academic assistant. Always respond with valid raw JSON only. No markdown, no backticks, no explanation.',
                        ],
                        [
                            'role'    => 'user',
                            'content' => $prompt,
                        ],
                    ],
                ]);

            if ($response->failed()) {
                return '';
            }
            return $response->json('choices.0.message.content');
        } catch (Exception $e) {
            return '';
        }



        // ── Claude (swap in when ready) ─────────────────────────────────
        // $response = Http::withHeaders([
        //     'x-api-key'         => config('services.anthropic.key'),
        //     'anthropic-version' => '2023-06-01',
        // ])
        // ->timeout(60)
        // ->post('https://api.anthropic.com/v1/messages', [
        //     'model'      => 'claude-3-5-haiku-20241022',
        //     'max_tokens' => 2048,
        //     'system'     => 'You are an academic assistant. Always respond with valid raw JSON only. No markdown, no backticks, no explanation.',
        //     'messages'   => [
        //         ['role' => 'user', 'content' => $prompt],
        //     ],
        // ]);
        // return $response->json('content.0.text');

        // // ── Gemini (swap in when ready) ─────────────────────────────────
        // try {
        //     $response = Http::timeout(15)
        //         ->post(
        //             'https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key='
        //                 . config('services.gemini.key'),
        //             [
        //                 'contents' => [
        //                     ['parts' => [['text' => $prompt]]]
        //                 ],
        //             ]
        //         );

        //     if ($response->failed()) {
        //         return '';
        //     }

        //     return $response->json('candidates.0.content.parts.0.text') ?? '';
        // } catch (\Exception $e) {
        //     return '';
        // }
    }

    // ───────────────────────────────────────────────────────────────────

    public function generate(string $syllabus): array
    {
        $prompt = $this->buildPrompt($syllabus);
        $raw    = $this->callAI($prompt);
        return $this->parseResponse($raw);
    }

    private function buildPrompt(string $syllabus): string
    {
        $today = now()->toDateString();

        return <<<PROMPT
        You are an academic assistant. Analyze the following course syllabus and extract structured data from it.

        Return ONLY a valid JSON object with this exact structure:
        {
          "name": "Course name extracted from syllabus",
          "color": "One of: #3b82f6, #8b5cf6, #10b981, #f59e0b, #ef4444, #ec4899",
          "examDate": "YYYY-MM-DD format, or null if not found",
          "topics": [
            { "week": 1, "title": "Topic title" }
          ],
          "assignments": [
            { "title": "Assignment title", "dueDate": "YYYY-MM-DD" }
          ]
        }

        Rules:
        - Extract as many topics and assignments as you can find.
        - If no exam date is mentioned, set examDate to null.
        - If no week number is mentioned for a topic, assign weeks sequentially starting from 1.
        - If no due date is found for an assignment, estimate based on context or use null.
        - Today's date is {$today}. Use this to interpret relative dates like "next Monday".
        - Pick a color that fits the course subject (blue for tech, green for science, purple for arts, etc.).
        - Return raw JSON only. No markdown. No backticks. No explanation.

        Syllabus:
        {$syllabus}
        PROMPT;
    }

    private function defaultCourse(): array
    {
        return [
            'id'          => (string) Str::uuid(),
            'name'        => 'Untitled Course',
            'color'       => '#3b82f6',
            'progress'    => 0,
            'examDate'    => "",
            'topics'      => [],
            'assignments' => [],
        ];
    }

    private function parseResponse(string $raw): array
    {
        // Strip any accidental markdown fences the AI might add
        $cleaned = preg_replace('/```json|```/i', '', $raw);
        $cleaned = trim($cleaned);

        $data = json_decode($cleaned, true);

        if (json_last_error() !== JSON_ERROR_NONE || !is_array($data)) {
            return $this->defaultCourse();
        }

        // Normalize into the exact shape the frontend expects
        return [
            'id'          => (string) Str::uuid(),
            'name'        => $data['name']     ?? 'Untitled Course',
            'color'       => $data['color']    ?? '#3b82f6',
            'progress'    => 0,
            'examDate'    => $data['examDate'] ?? "",
            'topics'      => collect($data['topics'] ?? [])->map(fn($t, $i) => [
                'id'        => 't' . ($i + 1),
                'week'      => (int) ($t['week'] ?? 1),
                'title'     => $t['title'] ?? '',
                'completed' => false,
            ])->values()->all(),
            'assignments' => collect($data['assignments'] ?? [])->map(fn($a, $i) => [
                'id'        => 'a' . ($i + 1),
                'title'     => $a['title']   ?? '',
                'dueDate'   => $a['dueDate'] ?? "",
                'completed' => false,
            ])->values()->all(),
        ];
    }
}
