<?php

namespace App\Http\Controllers;

use App\Http\Requests\Desk\StoreRequest;
use App\Models\Dashboards;
use Illuminate\Http\Request;

class DashboardController extends Controller
{
    public function index(){
        $dashboards = Dashboards::all();

        return view('backend.dashboards.index', compact('dashboards'));
    }

    public function show($id){

    }

    public function store(StoreRequest $request){

    }

    public function update(){

    }

    public function delete($id){

    }
}
