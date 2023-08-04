<?php

namespace App\Http\Controllers;

use App\Models\Dashboards;
use Illuminate\Http\Request;

class HomeController extends Controller
{
    public function index()
    {
        $dashboards = Dashboards::query()->where('user_id', auth()->user()->id)->first();
        return view('main.main', compact('dashboards'));
    }
}
