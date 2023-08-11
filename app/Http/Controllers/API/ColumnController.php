<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Models\Columns;
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
}
