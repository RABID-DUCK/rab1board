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
