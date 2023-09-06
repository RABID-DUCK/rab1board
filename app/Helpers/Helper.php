<?php

namespace App\Helpers;

use App\Models\Notification;
use Illuminate\Http\Request;

class Helper
{
    public static function sendNotification($user_id, $message){
        $data = Request::validate(['user_id' => 'required|integer', 'message' => 'required|string']);

        return Notification::create([
            'user_id' => $data['user_id'],
            'message' => htmlspecialchars($data['message'])
        ]);
    }

    public static function getNotifications($user){
        $user = Request::validate(['user_id' => 'required|integer']);
        $notifications = Notification::where('user', $user['user_id'])->get();

        return $notifications->map(function ($notification){
            $notification->message = htmlspecialchars_decode($notification->message);
            return $notification;
        });
    }
}
