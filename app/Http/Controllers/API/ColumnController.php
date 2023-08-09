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

        return response()->json(['columns' => $columns, 'column_id' => $column->id]);
    }
}
