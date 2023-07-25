<?php

namespace App\Http\Controllers;

use App\Models\Langs;
use Illuminate\Http\Request;

class LangsController extends Controller
{
    public function index(){
        $langs = Langs::all();

        return view('backend.langs.index', compact('langs'));
    }
}
