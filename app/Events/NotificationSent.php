<?php

namespace App\Events;

use App\Models\Notification;
use Illuminate\Broadcasting\Channel;
use Illuminate\Broadcasting\InteractsWithSockets;
use Illuminate\Broadcasting\PresenceChannel;
use Illuminate\Broadcasting\PrivateChannel;
use Illuminate\Contracts\Broadcasting\ShouldBroadcast;
use Illuminate\Foundation\Events\Dispatchable;
use Illuminate\Queue\SerializesModels;

class NotificationSent implements ShouldBroadcast
{
    use Dispatchable, InteractsWithSockets, SerializesModels;

    public int $userId;
    private array $notifications;

    /**
     * Create a new event instance.
     */
    public function __construct(array $notifications, int $userId)
    {
        $this->notifications = $notifications;
        $this->userId = $userId;
    }

    /**
     * Получить каналы трансляции события.
     *
     * @return \Illuminate\Broadcasting\PrivateChannel
     */
    public function broadcastOn(): array
    {
        return [
            new PrivateChannel('notification.'. $this->userId),
        ];
    }

    /**
     * Имя транслируемого события.
     *
     * @return string
     */
    public function broadcastAs(): string
    {
        return 'notifications';
    }

    /**
     * Получите данные для трансляции.
     *
     * @return array
     */
    public function broadcastWith(): array
    {
        return [
            'notifications' => $this->notifications,
        ];
    }
}
