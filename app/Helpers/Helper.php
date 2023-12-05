<?php

namespace App\Helpers;

use App\Events\NotificationSent;
use App\Models\Notification;
use App\Models\NotificationType;
use Illuminate\Http\Request;

class Helper
{
    public static function sendNotification($user_id, $message, $type_name){

        if($type_id = NotificationType::where('type', $type_name)->first()){
            $notification = Notification::create([
                'user_id' => $user_id,
                'message' => htmlspecialchars($message),
                'type_id' => $type_id->id
            ]);

            broadcast(new NotificationSent($notification))->toOthers();
        }
    }

    public static function getNotifications($user){
        if($notifications = Notification::where('user_id', $user)->where('read', false)->get()){
            $arr = $notifications->map(function ($notification) {
                return [
                    'id' => $notification->id,
                    'user' => $notification->getUser['email'],
                    'message' => $notification->message,
                    'type' => $notification->getType['type']
                ];
            });
            return response()->json($arr);
        }
    }
}
