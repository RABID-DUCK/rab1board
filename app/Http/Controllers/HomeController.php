<?php

namespace App\Http\Controllers;

use App\Models\Dashboards;
use Illuminate\Http\Request;

class HomeController extends Controller
{
    public function index()
    {
        if (auth()->user()) {
            $dashboards = Dashboards::query()->where('user_id', auth()->user()->id)->get();
            return view('main.main', compact('dashboards'));
        }

        return view('main.main');
    }
}
