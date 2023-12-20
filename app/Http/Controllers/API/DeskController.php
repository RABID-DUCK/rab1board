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
use App\Models\User;
use App\Models\UserDashboards;
use App\Models\UserDesks;
use Illuminate\Http\Request;
use Illuminate\Support\Carbon;
use Illuminate\Support\Facades\Storage;

class DeskController extends Controller
{
    public function store(Request $request){
        $data = $request->validate(['title' => 'required|string|max:30', 'dashboard_id' => 'required', 'column_id' => 'required', 'user_id' => 'required|integer']);

        $desk = Desks::create($data);

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

        foreach ($data as $key => $value) {
            if(in_array($key, ['id', 'title', 'description', 'image', 'status', 'data_start', 'data_end'])){
                $column->{$key} = $value;
            }
        }

        $column->save();

        return new DeskResource($column);
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
            })->first();

        return DeskResource::make($desk);
    }

    public function addImages(Request $request){
    $data = $request->validate(['image' => 'required', 'dashboard_id' => 'required', 'desk_id' => 'required']);

    if($data['image']){
        $fileName = $data['image']->getClientOriginalName();
        if(!DeskImages::where('image', 'images/'.$fileName)->first()){
            $filePath = Storage::disk('public')->putFileAs('/images', $data['image'], $fileName);
            DeskImages::create([
                'desk_id' => $data['desk_id'],
                'image' => $filePath
            ]);

            $images = DeskImages::where('desk_id', $data['desk_id'])->get();
            return response()->json(['status' => 200, 'files' => $images]);
        }
        else{
            return response()->json(['message_user' => 'Такой файл уже существует!']);
        }
    }
        return response()->json(['message_user' => 'Не найдено ни одного файла!']);
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

    public function outputDesks(Request $request){
        $data = $request->validate(['dashboard_id' => 'required|integer']);
        $user = User::where('remember_token', $request->bearerToken())->first();
        if ($userDash = UserDashboards::where('user_id', $user->id)->first()){
            if(!$userDash->invited) return response()->json(['message' => 'Вы ещё не приняли приглашение!']);

            if (Desks::where('dashboard_id', $data['dashboard_id'])->exists()){
                return DeskResource::collection(Desks::where('dashboard_id', $data['dashboard_id'])->orderBy('order')->get());
            }
        }
        return response()->json(['message' => 'Вы не состоите в этом проекте!']);
    }

    public function delete(Request $request){
        $id = $request->validate(['id' => 'required|integer']);
        if ($dash = Desks::where('id', $id)->first()){
            $dash->delete();
            return response()->json(['status' => 200]);
        }
        return response()->json(['message' => 'Произошла ошибка! Не найден проект...']);
    }

}
