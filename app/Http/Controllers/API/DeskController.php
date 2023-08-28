<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Http\Requests\Desk\UpdateRequest;
use App\Http\Resources\API\DeskResource;
use App\Models\ColumnDesks;
use App\Models\Columns;
use App\Models\DeskFiles;
use App\Models\DeskImages;
use App\Models\Desks;
use App\Models\Tasks;
use Illuminate\Http\Request;
use Illuminate\Support\Carbon;
use Illuminate\Support\Facades\Storage;

class DeskController extends Controller
{
    public function store(Request $request){
        $messages = ['title.required' => "Поле названия обязательно к заполнению!"];

        $data = $request->validate(['title' => 'required|string|max:30', 'dashboard_id' => 'required', 'column_id' => 'required',], $messages);

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
        $data = $request->validate(['image' => 'required', 'dashboard_id' => 'required', 'desk_id' => 'required']);

        if($data['image']){
            $filePath = Storage::disk('public')->put('/images', $data['image']);
            $file = '/storage/' . $filePath;
            DeskImages::create([
                'desk_id' => $data['desk_id'],
                'image' => $file
            ]);

            $images = DeskImages::where('desk_id', $data['desk_id'])->get();
            return response()->json(['status' => 200, 'images' => $images]);
        }
        return response()->json(['message_user' => 'Не найдено ни одной картинки!']);
     }

    public function addFiles(Request $request)
    {
        $data = $request->validate(['file' => 'required', 'dashboard_id' => 'required', 'desk_id' => 'required']);
        if ($data['file']) {
            $fileName = $data['file']->getClientOriginalName();
            if (!DeskFiles::where('file', 'files/'.$fileName)->first()) {
                $filePath = Storage::disk('public')->putFileAs('/files', $data['file'], $fileName);
                DeskFiles::create([
                    'desk_id' => $data['desk_id'],
                    'file' => $filePath
                ]);

                $files = DeskFiles::where('desk_id', $data['desk_id'])->get();

                return response()->json(['status' => 200, 'files' => $files]);
            }
            else{
                return response()->json(['message_user' => 'Такой файл уже существует!']);
            }
        }
        return response()->json(['message_user' => 'Не найдено ни одного файла!']);
    }
}
