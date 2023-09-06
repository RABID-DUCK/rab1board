<?php

namespace App\Http\Controllers\API;

use App\Helpers\Helper;
use App\Http\Controllers\Controller;
use App\Models\Notification;
use Illuminate\Http\Request;

class NotificationController extends Controller
{
    public function getNotifications(Request $request){
        $user = $request->validate(['user_id' => 'required|integer']);
        return Helper::getNotifications($user);
    }
}
