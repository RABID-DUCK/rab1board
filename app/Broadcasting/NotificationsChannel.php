<?php

namespace App\Broadcasting;

use App\Models\User;

class NotificationsChannel
{
    /**
     * Create a new channel instance.
     */
    public function __construct()
    {

    }

    /**
     * Authenticate the user's access to the channel.
     */
    public function join(User $user)
    {
        return auth()->user();
    }
}
