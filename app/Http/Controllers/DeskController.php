<?php

namespace App\Http\Controllers;

use App\Http\Requests\Desk\StoreRequest;
use App\Http\Requests\Desk\UpdateRequest;
use App\Models\Desks;
use Illuminate\Http\Request;

class DeskController extends Controller
{
    public function index(){
        $desks = Desks::all();

        return view('backend.desks.index', compact('desks'));
    }

    public function show($id){
        return Desks::query()->where('id', $id)->first();
    }

    public function store(StoreRequest $request){
        $data = $request->validated();
        Desks::create($data);

        return redirect()->route('backend.desks.index');
    }

    public function update(UpdateRequest $request){
        $data = $request->validated();
        $desk_id = $data['desk_id'];
        unset($data['desk_id']);

        Desks::query()->where('id', $desk_id)->update($data);

        return redirect()->route('backend.desks.index');
    }

    public function delete($id){
        Desks::query()->where('id', $id)->delete();

        return redirect()->route('backend.desks.index');
    }
}
