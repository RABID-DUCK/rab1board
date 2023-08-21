<?php

namespace App\Http\Controllers;

use App\Models\Dashboards;
use Illuminate\Http\Request;
use Illuminate\Support\Carbon;

class HomeController extends Controller
{
    public function index()
    {
        if (auth()->user()) {
            $data = Dashboards::all();

            $dashboards = [];

            foreach($data as $dashboard) {
                $data[$dashboard->id] = [
                    'title' => $dashboard->title,
                    'description' => $dashboard->description,
                    'image' => $dashboard->image,
                    'data_start' => $dashboard->data_start,
                    'data_end' => $dashboard->data_end,
                    'status' => $dashboard->status ? true : false,
                    'dateTime' => Carbon::parse($dashboard->data_end)->translatedFormat('j F Y')
                ];
            }
            return view('main.main', compact('dashboards'));
        }

        return view('main.main');
    }
}
