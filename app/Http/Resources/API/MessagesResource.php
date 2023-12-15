<?php

namespace App\Http\Resources\API;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class MessagesResource extends JsonResource
{

    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {

        return [
            'id' => $this->chat_dashboard_id,
            'messages' => $this->messages,
            'group_time' => $this->group_time
        ];
    }
}
