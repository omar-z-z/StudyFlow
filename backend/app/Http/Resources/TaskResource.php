<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class TaskResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray($request): array
    {
        return [
            'id'             => $this->id,
            'title'          => $this->title,
            'completed'      => $this->completed,
            'estimatedTime' => $this->estimated_time,
            'priority'       => $this->priority,
            'type'           => $this->type,
            'date'           => $this->date,

            'course'         => $this->whenLoaded('course'),

            'created_at'     => $this->created_at,
        ];
    }
}
