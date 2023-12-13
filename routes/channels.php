<?php

use Illuminate\Support\Facades\Broadcast;

/*
|--------------------------------------------------------------------------
| Broadcast Channels
|--------------------------------------------------------------------------
|
| Here you may register all of the event broadcasting channels that your
| application supports. The given channel authorization callbacks are
| used to check if an authenticated user can listen to the channel.
|
*/
//Broadcast::channel('user.{userId}', function ($user, $userId) {
//    return $user->id === $userId;
//});

Broadcast::channel('notification.{userId}', \App\Broadcasting\NotificationsChannel::class);
Broadcast::channel('notification.{id}', function ($user, $id){
    return (int) $user->id === (int) $id;
});
Broadcast::channel('chat-get', function (){
    return auth()->user();
});
//
//Broadcast::channel('desks', \App\Broadcasting\DesksChannel::class);
//Broadcast::channel('columns', \App\Broadcasting\ColumnsChannel::class);
