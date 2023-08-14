<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Http\Resources\API\DeskResource;
use App\Models\ColumnDesks;
use App\Models\Columns;
use App\Models\Desks;
use Illuminate\Http\Request;

class DeskController extends Controller
{
    public function store(Request $request){
        $messages = [
            'title.required' => "Поле названия обязательно к заполнению!"
        ];

        $data = $request->validate([
            'title' => 'required|string|max:30',
            'dashboard_id' => 'required',
            'column_id' => 'required',
        ], $messages);

        $desk = Desks::create($data);

        $column_desk_list = [
            'dashboard_id' => $data['dashboard_id'],
            'desk_id' => $desk->id,
            'column_id' => $data['column_id'],
        ];

         ColumnDesks::create($column_desk_list);

        return response()->json(['desk' => $desk, 'column_id' => $data['column_id']]);
    }

    public function update(){
//        $column = ColumnDesks::where([
//            ['dashboard_id', '=', $data['dashboard_id']],
//            ['desk_id', '=', $desk->id],
//            ['column_id', '=', $data['column_id']],
//        ])->first();
    }

    public function show(Request $request){
        $data = $request->validate(['dashboard_id' => 'required|integer', 'column_id' => 'required|integer', 'desk_id' => 'required|integer']);

        $desk = Desks::with('dashboard', 'column')->where('id', $data['desk_id'])
            ->whereHas('dashboard', function ($query) use ($data) {
                $query->where('id', $data['dashboard_id']);
            })
            ->whereHas('column', function ($query) use ($data) {
                $query->where('id', $data['column_id']);
            })
            ->first();

        return DeskResource::make($desk);
    }

}
