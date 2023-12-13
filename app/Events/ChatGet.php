<?php

namespace App\Events;

use App\Models\MessagesChatDashboard;
use Illuminate\Broadcasting\Channel;
use Illuminate\Broadcasting\InteractsWithSockets;
use Illuminate\Broadcasting\PresenceChannel;
use Illuminate\Broadcasting\PrivateChannel;
use Illuminate\Contracts\Broadcasting\ShouldBroadcast;
use Illuminate\Foundation\Events\Dispatchable;
use Illuminate\Queue\SerializesModels;

class ChatGet implements ShouldBroadcast
{
    use Dispatchable, InteractsWithSockets, SerializesModels;

    protected MessagesChatDashboard $messagesChatDashboard;
    /**
     * Create a new event instance.
     */
    public function __construct($messagesChatDashboard)
    {
        $this->messagesChatDashboard = $messagesChatDashboard;
    }

    /**
     * Get the channels the event should broadcast on.
     *
     * @return array<int, \Illuminate\Broadcasting\Channel>
     */
    public function broadcastOn(): array
    {
        return [
            new PrivateChannel('chat-get'),
        ];
    }

    /**
     * Имя транслируемого события.
     *
     * @return string
     */
    public function broadcastAs(): string
    {
        return 'chat_messages';
    }

    /**
     * Получите данные для трансляции.
     *
     * @return array
     */
    public function broadcastWith(): array
    {
        return [
            'message' => $this->messagesChatDashboard,
        ];
    }
}
