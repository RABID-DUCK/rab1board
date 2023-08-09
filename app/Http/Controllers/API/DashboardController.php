<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Models\Dashboards;
use App\Models\User;
use Illuminate\Http\Request;

class DashboardController extends Controller
{
    public function store(Request $request){
        $data = $request->validate(['title' => 'required|string', 'user_id' => 'nullable']);

        if(!User::query()->where('id', $data['user_id'])->first()) return response()->json(["status" => 401,
            "message" => "Произошла ошибка! Повторите попытку. Если ошибка продолжится, то свяжитесь с администрацией сайта!"]);

        Dashboards::create($data);

        return Dashboards::query()->where('user_id',  $data['user_id'])->get();
    }

    public function index(){

    }
}
