<?php

namespace App\Http\Controllers\API;

use App\Events\NotificationSent;
use App\Helpers\Helper;
use App\Http\Controllers\Controller;
use App\Models\Dashboards;
use App\Models\Notification;
use App\Models\NotificationType;
use App\Models\User;
use App\Models\UserDashboards;
use Illuminate\Http\Request;

class UserDashboardController extends Controller
{
    public function getUsers(Request $request){
        $data = $request->validate(['dashboard_id' => 'required|integer']);

        return UserDashboards::with('getUsers')->where('dashboard_id', $data['dashboard_id'])->where('confirmed', true)
            ->whereHas('getUsers', function ($query) use ($data){
                $query->where('dashboard_id', $data['dashboard_id']);
            })->get();
    }

    public function addUser(Request $request){
        $data = $request->validate(['email' => 'required|string', 'dashboard_id' => 'required|integer']);

        if($user = User::where('email', $data['email'])->first()){
            if($users = UserDashboards::where('dashboard_id', $data['dashboard_id'])->where('user_id', $user->id)->get()){
                foreach ($users as $userDash){
                    if(!$userDash->confirmed) return response()->json(['err' => 'was_sending','message' => 'Приглашение уже было отправлено!']);
                }
            }

            $dashboards = UserDashboards::create([
                'user_id' => $user->id,
                'dashboard_id' => $data['dashboard_id'],
                'invited' => true,
                'confirmed' => false
            ]);

            if($type_id = NotificationType::where('type', 'invite_dashboard')->first()){
                $dash = Dashboards::where('id', $data['dashboard_id'])->first();
                $notification = Notification::create([
                    'user_id' => $user->id,
                    'message' => "Пользователь $user->email пригласил вас в свой проект — $dash->title. <input type='hidden' value='$dash->id' />",
                    'type_id' => $type_id->id
                ]);

                $arr_notif = [
                  'message' => $notification->message,
                  'user' => $user->email,
                  'type' => $type_id->type,
                  'dashboard_id' => $dash->id
                ];

                broadcast(new NotificationSent($arr_notif, $dashboards->user_id))->toOthers();

                return response()->json(['success' => true,'message' => 'Приглашение отправлено']);
            }

        }
        else{
            return response()->json(['err' => 'user_not_found','message' => 'Пользователь не найден']);
        }
    }

    public function confirmInvite(Request $request){
        $data = $request->validate(['user_id' => 'required|integer', 'dashboard_id' => 'required|integer',
            'confirmed' => 'required|boolean', 'not_id' => 'required|integer']);

        if($invite = UserDashboards::where('dashboard_id', $data['dashboard_id'])->where('user_id', $data['user_id'])->first()){
            $invite->confirmed = $data['confirmed'];
            $invite->save();
            $not = Notification::where('id', $data['not_id'])->first();
            $not->read = true;
            $not->save();

            return response()->json(['status' => 200, 'message' => 'Приглашение принято']);
        }

        return response()->json(['message' => 'Произошла ошибка...попробуйте позже!']);
    }

    public function permissionUser(Request $request){
        $data = $request->validate(['user_id' => 'required|integer', 'dash_id' => 'required|integer']);
        if(UserDashboards::where('user_id', $data['user_id'])->where('dashboard_id', $data['dash_id'])->where('confirmed', true)->first()){
            return response()->json(['message' => 'Пользователь учавствует в проекте'], 200);
        }
        else{
            return response()->json(['error' => 'Пользователей не найден!'],423);
        }
    }
}
