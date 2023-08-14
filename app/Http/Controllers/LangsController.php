<?php

namespace App\Http\Controllers;

use App\Http\Requests\Langs\StoreRequest;
use App\Http\Requests\Langs\UpdateRequest;
use App\Models\Langs;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\File;
use Illuminate\Support\Facades\Lang;

class LangsController extends Controller
{
    public function index(){
        $langs = Langs::all();

        return view('backend.langs.index', compact('langs'));
    }

    public function store(StoreRequest $request){
        $data = $request->validated();

        $lang = Langs::create($data);

//        \Rabid::write_lang($lang, 'messages.php', 'messages.php');

        return redirect('/backend/langs');
    }

    public function delete($id)
    {
        Langs::where('id', $id)->delete();

        return redirect('/backend/langs');
    }

    public function show($id)
    {
        $lang = Langs::where('id', $id)->get();

        return response()->json($lang);
    }

    public function update(UpdateRequest $request)
    {
        $langs = Langs::all();

        $data = $request->validated();
        $lang = Langs::where('id', $data['id'])->update($data);

        if ($lang){
//            \Rabid::write_lang((object)$data, 'messages.php', 'messages.php');

            return redirect('/backend/langs');
        } else{
            return view('backend.langs.index', compact('langs'));
        }
    }
}
