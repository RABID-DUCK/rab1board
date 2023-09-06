<?php

namespace App\Http\Interfaces;

interface NotificationInterface
{
    public function sendNotification($user_id, $message);
    public function getNotifications($user);
}
