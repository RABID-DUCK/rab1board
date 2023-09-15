<?php

namespace App\Events;

use App\Models\Desks;
use Illuminate\Broadcasting\Channel;
use Illuminate\Broadcasting\InteractsWithSockets;
use Illuminate\Broadcasting\PresenceChannel;
use Illuminate\Broadcasting\PrivateChannel;
use Illuminate\Contracts\Broadcasting\ShouldBroadcast;
use Illuminate\Foundation\Events\Dispatchable;
use Illuminate\Queue\SerializesModels;

class DeskMove implements ShouldBroadcast
{
    use Dispatchable, InteractsWithSockets, SerializesModels;

    public Desks $desk;

    /**
     * Create a new event instance.
     */
    public function __construct(Desks $desk)
    {
        $this->desk = $desk;
    }

    /**
     * Get the channels the event should broadcast on.
     *
     * @return array<int, \Illuminate\Broadcasting\Channel>
     */
    public function broadcastOn(): array
    {
        return [
            new Channel('desks'),
        ];
    }

    public function broadcastAs(): string
    {
        return 'desk_move';
    }

    public function broadcastWith(): array
    {
        return ['desks' => $this->desk];
    }
}
