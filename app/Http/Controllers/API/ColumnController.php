<?php

namespace App\Http\Controllers\API;

use App\Events\ColumnMove;
use App\Http\Controllers\Controller;
use App\Models\ColumnDesks;
use App\Models\Columns;
use App\Models\Desks;
use Illuminate\Http\Request;

class ColumnController extends Controller
{
    public function store(Request $request){
        $data = $request->validate(['dashboard_id' => 'required', 'title' => "required|string"]);
        $column = Columns::create($data);
        $columns = Columns::where('dashboard_id', $data['dashboard_id'])->get();

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

    public function index(Request $request){
        return Columns::where('dashboard_id', $request->dashboard_id)->get();
    }

    public function moveColumn($dashboard, $desk, $item_id, $column_id){
        if($column = Desks::where('id', $desk)->first()){
            $column->column_id = $item_id;
            $column->save();
            return $column;
        }
    }

    public function delete(Request $request){
        $id = $request->validate(['id' => 'required|integer']);
        if ($dash = Columns::where('id', $id)->first()){
            $dash->delete();
            return response()->json(['status' => 200]);
        }
        return response()->json(['message' => 'Произошла ошибка! Не найден проект...']);
    }

    public function getColumns(Request $request){
        $data = $request->validate(['dashboard_id' => 'required|integer']);
        return Columns::where('dashboard_id', $data['dashboard_id'])->get();
    }

    public function getDesks(Request $request){
        $data = $request->validate(['col_id' => 'required|integer']);
        return Desks::where('column_id', $data['col_id'])->get();
    }

    public function dragDrop(Request $request){
        $columnOder = $request->input('columnOrder');
        $columns = [];

        foreach ($columnOder as $key => $columnId){
            $column = Columns::where('id', $columnId)->first();
            $column->order = $key + 1;
            $column->save();
            $columns[] = $column;
        }
        broadcast(new ColumnMove($columns))->toOthers();

        return response()->json(['success' => true]);
    }
}
