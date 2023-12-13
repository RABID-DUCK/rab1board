<?php

namespace App\Http\Controllers\API;

use App\Helpers\Helper;
use App\Http\Controllers\Controller;
use App\Http\Interfaces\NotificationInterface;
use App\Models\ChatDashboard;
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
            'invited' => true,
            'confirmed' => true
        ]);

        ChatDashboard::create([
            'user_id' => $data['user_id'],
            'dashboard_id' => $dash->id
        ]);

        if($dashboards = UserDashboards::where('user_id', $data['user_id'])->where('confirmed', true)->get()){
            return $dashboards;
        }

        return response()->json(['status' => 200, 'message' => 'Проекты не найдены!']);
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

    public function getDashboards(Request $request)
    {
        $user = User::where('remember_token', $request->bearerToken())->first();

        // Получаем список дашбордов пользователя
        if($dashboards = UserDashboards::where('user_id', $user->id)->where('confirmed', true)){
           $keys = $dashboards->pluck('dashboard_id'); // Возвращает массив ключей дашбордов

            // Получаем сами дашборды из таблицы Dashboards по полученным ключам
            return Dashboards::whereIn('id', $keys)->get();
        }

        return response()->json(['status' => 200, 'message' => 'Пректов не найдено!']);
    }

}
