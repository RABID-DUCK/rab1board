<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Models\ColorDesks;
use App\Models\Colors;
use App\Models\Desks;
use Illuminate\Http\Request;

class ColorController extends Controller
{
    public function index(){
        return Colors::all();
    }

    public function addColor($color, $desk){
        if ($deskC = Desks::where('id', $desk)->first()){
            $deskC->color_id = $color;
            $deskC->save();
        }

        return $deskC->color;
    }

}
