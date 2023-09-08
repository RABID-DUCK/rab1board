<?php

namespace App\Http\Controllers;

use App\Models\Dashboards;
use App\Models\Notification;
use App\Models\UserDashboards;
use Illuminate\Http\Request;

class HomeController extends Controller
{
    public function index()
    {
        if (auth()->user()) {
            $dashboards = array();
            if(UserDashboards::where('user_id', auth()->user()->id)->first()){
                foreach (UserDashboards::where('user_id', auth()->user()->id)->get() as $dash){
                    if($dash->confirmed) {
                        $dashboards[] = $dash->getDashboards;
                    }
                }
            }
            return view('main.main', compact('dashboards'));
        }

        return view('main.main');
    }
}
