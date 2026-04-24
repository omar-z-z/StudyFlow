<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class CourseResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray($request): array
    {
        $topics      = $this->whenLoaded('topics', fn() => $this->topics, collect());
        $assignments = $this->whenLoaded('assignments', fn() => $this->assignments, collect());

        $total     = $topics->count() + $assignments->count();
        $completed = $topics->where('completed', true)->count()
            + $assignments->where('completed', true)->count();

        $progress = $total > 0 ? (int) round(($completed / $total) * 100) : 0;


        return [
            'id'         => $this->id,
            'name'       => $this->name,
            'color'      => $this->color,
            'progress'   => $progress,
            'examDate'   => $this->exam_date,

            'topics'     => $this->whenLoaded('topics'),
            'assignments'=> $this->whenLoaded('assignments'),
            'tasks'      => $this->whenLoaded('tasks'),

            'created_at' => $this->created_at,
        ];
    }
}
