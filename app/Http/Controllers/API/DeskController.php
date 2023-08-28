<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Http\Requests\Desk\UpdateRequest;
use App\Http\Resources\API\DeskResource;
use App\Models\ColumnDesks;
use App\Models\Columns;
use App\Models\Desks;
use App\Models\Tasks;
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

    public function update(UpdateRequest $request){
        $data = $request->validated();
        $column = Desks::where('id', $data['id'])->first();
        if(isset($data['task_id']) && $task = Tasks::where('id', $data['task_id'])->first()){
            $task->done = $data['done'];
            $task->save();
            return $task;
        }

        if (isset($data['title']) && $column->title !== $data['title']) {
            $column->title = $data['title'];
        } elseif (isset($data['description']) && $column->description !== $data['description']) {
            $column->description = $data['description'];
        } elseif (isset($data['image']) && $column->image !== $data['image']) {
            $column->image = $data['image'];
        } elseif (isset($data['status']) && $column->status !== $data['status']) {
            $column->status = $data['status'];
        } elseif (isset($data['data_start']) && $column->data_start !== $data['data_start']) {
            $column->data_start = $data['data_start'];
        } elseif (isset($data['data_end']) && $column->data_end !== $data['data_end']) {
            $column->data_end = $data['data_end'];
        }
        if (isset($data['data_end']) && $column->data_end !== $data['data_end']){
            $column->data_end = $data['data_end'];
        }

        $column->save();

        return $column;
    }

    public function show(Request $request){
        $data = $request->validate(['dashboard_id' => 'required|integer', 'column_id' => 'required|integer', 'desk_id' => 'required|integer',
            'list_task_id' => 'nullable|integer']);

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

    public function addImages(Request $request){
        $data = $request->validate(['file' => 'nullable']);
//        $array = json_decode($data, true);
//        foreach ($array as $image){
//            Desks::
//        }
        dd($data);
    }

    public function outputDesks(Request $request){
        $data = $request->validate(['dashboard_id' => 'required|integer']);
        if (Desks::where('dashboard_id', $data['dashboard_id'])->get()->count() > 0){
            $desks = Desks::where('dashboard_id', $data['dashboard_id'])->get();
            return response()->json(['desks' => $desks]);
        }

        return response()->json(['message' => 'Доски не найдены']);
    }

}
