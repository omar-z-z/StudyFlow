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
        return [
            'id'         => $this->id,
            'name'       => $this->name,
            'color'      => $this->color,
            'progress'   => $this->progress,
            'examDate'  => $this->exam_date,

            'topics'     => $this->whenLoaded('topics'),
            'assignments'=> $this->whenLoaded('assignments'),
            'tasks'      => $this->whenLoaded('tasks'),

            'created_at' => $this->created_at,
        ];
    }
}
