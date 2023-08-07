<?php

namespace App\Http\Controllers;

use App\Http\Requests\Desk\StoreRequest;
use App\Models\Dashboards;
use App\Models\User;
use Illuminate\Http\Request;

class DashboardController extends Controller
{
    public function index(){
        $dashboards = Dashboards::all();

        return view('backend.dashboards.index', compact('dashboards'));
    }

    public function show($id){
        $user = User::query()->where('id', auth()->user()->id)->first();
        if(!$user) return redirect()->route('login');

        $dashboard = Dashboards::query()->where('id', $id)->first();

        return view('dashboard.dashboard', compact('dashboard', 'user'));
    }

    public function store(StoreRequest $request){

    }

    public function update(){

    }

    public function delete($id){

    }
}
