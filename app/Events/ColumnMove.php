<?php

namespace App\Events;

use App\Models\Columns;
use Illuminate\Broadcasting\Channel;
use Illuminate\Broadcasting\InteractsWithSockets;
use Illuminate\Broadcasting\PresenceChannel;
use Illuminate\Broadcasting\PrivateChannel;
use Illuminate\Contracts\Broadcasting\ShouldBroadcast;
use Illuminate\Foundation\Events\Dispatchable;
use Illuminate\Queue\SerializesModels;

class ColumnMove implements ShouldBroadcast
{
    use Dispatchable, InteractsWithSockets, SerializesModels;
    private $columns = array();

    /**
     * Create a new event instance.
     */
    public function __construct($columns = array())
    {
        $this->columns = $columns;
    }

    /**
     * Get the channels the event should broadcast on.
     *
     * @return array<int, \Illuminate\Broadcasting\Channel>
     */
    public function broadcastOn(): array
    {
        return [
            new PrivateChannel('columns'),
        ];
    }

    public function broadcastAs(): string
    {
        return 'column_moves';
    }

    public function broadcastWith(): array
    {
        return [
            'columns' => $this->columns,
        ];
    }
}
