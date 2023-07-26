<?php

namespace App\Http\Controllers;

use App\Http\Requests\Langs\StoreRequest;
use App\Http\Requests\Langs\UpdateRequest;
use App\Models\Langs;
use Illuminate\Http\Request;

class LangsController extends Controller
{
    public function index(){
        $langs = Langs::all();

        return view('backend.langs.index', compact('langs'));
    }

    public function store(StoreRequest $request){
        $data = $request->validated();

        Langs::create($data);

        return redirect('/backend/langs');
    }

    public function delete($id)
    {
        Langs::query()->where('id', $id)->delete();

        return redirect('/backend/langs');
    }

    public function show($id)
    {
        $lang = Langs::query()->where('id', $id)->get();

        return response()->json($lang);
    }

    public function update(UpdateRequest $request, $id)
    {
        $langs = Langs::all();

        $data = $request->validated();
        $lang = Langs::query()->where('id', $id);
        if ($lang->update($data)){
            return redirect('/backend/langs');
        } else{
            return view('backend.langs.index', compact('langs'));
        }
    }
}
