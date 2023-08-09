<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
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
        $column = Columns::where('id', $data['column_id'])->first();
        if ($column){
            $column->create([
                'title' => $column->title,
                'desk_id' => $desk->id,
                'dashboard_id' => $data['dashboard_id']
            ]);
        }else{
            return response()->json(['message' => 'Произошла ошибка :(']);
        }

        return response()->json(['desk' => $desk, 'column_id' => $data['column_id']]);
    }
}
