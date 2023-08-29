<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Models\Dashboards;
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
        $data = $request->validate(['user_id' => 'required|integer', 'dashboard_id' => 'required|integer']);
        UserDashboards::create([
            'user_id' => $data['user_id'],
            'dashboard_id' => $data['dashboard_id']
        ]);
//        return response()->json()
    }
}
