<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Models\Colors;
use Illuminate\Http\Request;

class ColorController extends Controller
{
    public function index(){
        return Colors::all();
    }
}
