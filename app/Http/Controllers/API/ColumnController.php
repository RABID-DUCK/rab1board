<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Models\ColumnDesks;
use App\Models\Columns;
use App\Models\Desks;
use Illuminate\Http\Request;

class ColumnController extends Controller
{
    public function store(Request $request){
        $data = $request->validate(['dashboard_id' => 'required', 'title' => "required|string"]);
        $column = Columns::query()->create($data);
        $columns = Columns::query()->where('dashboard_id', $data['dashboard_id'])->get();

        return response()->json(['columns' => $columns, 'column_id' => $column->id, 'dashboard_id' => $data['dashboard_id']]);
    }

    public function update(Request $request){
        $data = $request->validate(['id' => 'required|integer', 'title' => 'required|string|max:30']);
        $column = Columns::where('id', $data['id'])->first();

        if ($column->title === $data['title']) return response()->json(['title' => $data['title']]);

        $column->title = $data['title'];
        $column->save();
        return response()->json(['title' => $column['title']]);
    }

    public function index(){
        return Columns::all();
    }

    public function moveColumn($dashboard, $desk, $item_id, $column_id){
        if($column = Desks::where('id', $desk)->first()){
            $column->column_id = $item_id;
            $column->save();
            return $column;
        }
    }
}
