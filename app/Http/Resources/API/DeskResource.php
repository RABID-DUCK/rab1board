<?php

namespace App\Http\Resources\API;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class DeskResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'title' => $this->title,
            'description' => $this->description,
            'task_id' => $this->task_id,
            'image' => $this->image,
            'status' => $this->status,
            'data_start' => $this->data_start,
            'data_end' => $this->data_end,
            'dashboard' => DashboardResource::make($this->whenLoaded('dashboard')),
            'column' => ColumnResource::make($this->whenLoaded('column'))
        ];
    }
}
