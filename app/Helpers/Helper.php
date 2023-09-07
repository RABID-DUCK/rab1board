<?php

namespace App\Helpers;

use App\Models\Notification;
use App\Models\NotificationType;
use Illuminate\Http\Request;

class Helper
{
    public static function sendNotification($user_id, $message, $type_name){

        if($type_id = NotificationType::where('type', $type_name)->first()){
            return Notification::create([
                'user_id' => $user_id,
                'message' => htmlspecialchars($message),
                'type_id' => $type_id->id
            ]);
        }
    }

    public static function getNotifications($user){
        $notifications = Notification::where('user_id', $user)->where('read', false)->get();

        return $notifications->map(function ($notification){
            $notification->message = htmlspecialchars_decode($notification->message);
            return $notification;
        });
    }
}
