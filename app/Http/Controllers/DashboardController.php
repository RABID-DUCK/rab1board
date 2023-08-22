<?php

namespace App\Http\Controllers;

use App\Http\Requests\Desk\StoreRequest;
use App\Models\Columns;
use App\Models\Dashboards;
use App\Models\Desks;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Carbon;

class DashboardController extends Controller
{
    public function index(){
        $dashboards = Dashboards::all();

        return view('backend.dashboards.index', compact('dashboards'));
    }

    public function show($id){
        if (!auth()->user()) return redirect()->route('board.index');
        $user = User::where('id', auth()->user()->id)->first();
        if(!$user) return redirect()->route('login');

        $dashboard = Dashboards::where('id', $id)->first();
        if(!$dashboard) return redirect()->route('board.index');
        $columns = Columns::where('dashboard_id', $id)->get();
        $desks = Desks::all();

        return view('dashboard.dashboard', compact('dashboard', 'user', 'columns', 'desks'));
    }

    public function store(StoreRequest $request){

    }

    public function update(){

    }

    public function delete($id){

    }
}
