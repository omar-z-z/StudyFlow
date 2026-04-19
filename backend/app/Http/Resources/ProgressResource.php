<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class ProgressResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray($request): array
    {
        return [
            'stats'           => $this['stats'],
            'dailyCompletion' => $this['dailyCompletion'],
            'tasksByType'     => $this['tasksByType'],
            'courseProgress'  => $this['courseProgress'],
            'summary'         => $this['summary'],
        ];
    }
}
