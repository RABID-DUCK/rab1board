<?php

namespace App\Http\Controllers\API;

use App\Helpers\Helper;
use App\Http\Controllers\Controller;
use App\Http\Interfaces\NotificationInterface;
use App\Models\Dashboards;
use App\Models\Notification;
use App\Models\User;
use App\Models\UserDashboards;
use Illuminate\Http\Request;

class DashboardController extends Controller
{
    public function store(Request $request){
        $data = $request->validate(['title' => 'required|string', 'user_id' => 'required']);

        if(!User::where('id', $data['user_id'])->first()) return response()->json(["status" => 401,
            "message" => "Произошла ошибка! Повторите попытку. Если ошибка продолжится, то свяжитесь с администрацией сайта!"]);

        $dash = Dashboards::create($data);
        UserDashboards::create([
            'user_id' => $data['user_id'],
            'dashboard_id' => $dash->id,
            'invited' => true
        ]);

        return Dashboards::where('user_id',  $data['user_id'])->get();
    }

    public function update(Request $request){
        $data = $request->validate([
            'id' => 'required|integer',
            'title' => 'required|string|max:55'
        ]);
        $dashboard = Dashboards::where('id', $data['id'])->first();

        if ($dashboard && $dashboard->title !== $data['title']){
            $dashboard->title = $data['title'];
            $dashboard->save();
        }
        return response()->json(['title' => $dashboard->title, 'id' => $dashboard->id]);
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
                'confirmed' => false
            ]);

            $script = "<span>Пользователь $user->email пригласил вас в своё рабочее пространство.
                            <div class='notif-btns'>
                                <button class='btn btn-success' onclick='setConfirm($user->id, $userDashboard->dashboard_id, true)'>Принять</button>
                                <button class='btn btn-danger' onclick='setConfirm($user->id, $userDashboard->dashboard_id, false)'>Отклонить</button>
                            </div>
                        </span>";

            Helper::sendNotification($user->id, $script, 'invite_dashboard');

            return response()->json(['status' => 200,'message' => 'Приглашение отправлено']);
        }
        else{
            return response()->json(['status' => 403,'message' => 'Пользователь не найден']);
        }
    }

    public function confirmInvite(Request $request){
        $data = $request->validate(['user_id' => 'required|integer', 'dashboard_id' => 'required|integer',
            'invited' => 'required|boolean', 'not_id' => 'required|integer']);

        if($invite = UserDashboards::where('dashboard_id', $data['dashboard_id'])->where('user_id', $data['user_id'])->first()){
            $invite->invited = $data['invited'];
            $invite->save();
            $not = Notification::where('id', $data['not_id'])->first();
            $not->read = $data['invited'];
            $not->save();

            return redirect()->route('board.show', $data['dashboard_id']);
        }

        return response()->json(['message' => 'Произошла ошибка...попробуйте позже!']);
    }

    public function delete(Request $request){
        $id = $request->validate(['id' => 'required|integer']);
        if ($dash = Dashboards::where('id', $id)->first()){
            $dash->delete();
            return response()->json(['status' => 200]);
        }
        return response()->json(['message' => 'Произошла ошибка! Не найден проект...']);
    }

    public function getDashboards(Request $request){
        $user = User::where('remember_token', $request->bearerToken())->first();
        return Dashboards::where('user_id', $user->id)->get();
    }
}
