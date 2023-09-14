<?php

namespace App\Http\Controllers\API;

use App\Events\NotificationSent;
use App\Helpers\Helper;
use App\Http\Controllers\Controller;
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
                    if(!$userDash->confirmed) return response()->json(['status' => 403,'message' => 'Приглашение уже было отправлено!']);
                }
            }

            $userDashboard = UserDashboards::create([
                'user_id' => $user->id,
                'dashboard_id' => $data['dashboard_id'],
                'invited' => true,
                'confirmed' => false
            ]);

            $script = "<span>Пользователь $user->email пригласил вас в своё рабочее пространство.
                            <div class='notif-btns'>
                                <button class='btn btn-success' onclick='setConfirm($user->id, $userDashboard->dashboard_id, true)'>Принять</button>
                                <button class='btn btn-danger' onclick='setConfirm($user->id, $userDashboard->dashboard_id, false)'>Отклонить</button>
                            </div>
                        </span>";

            if($type_id = NotificationType::where('type', 'invite_dashboard')->first()){
                $notification = Notification::create([
                    'user_id' => $user->id,
                    'message' => htmlspecialchars($script),
                    'type_id' => $type_id->id
                ]);

                broadcast(new NotificationSent($notification))->toOthers();

                return response()->json(['status' => 200,'message' => 'Приглашение отправлено', 'user_id' => $user->id]);
            }

        }
        else{
            return response()->json(['status' => 403,'message' => 'Пользователь не найден']);
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
}
