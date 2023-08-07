<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Models\Dashboards;
use Illuminate\Http\Request;

class DashboardController extends Controller
{
    public function store(Request $request){
        $data = $request->validate(['title' => 'required|string', 'user_id' => 'nullable']);

        Dashboards::create($data);

        $dashboards = Dashboards::query()->where('user_id', auth()->user()->id)->get();
        return view('main.main', compact('dashboards'));
    }
}
