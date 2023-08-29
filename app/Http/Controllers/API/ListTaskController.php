<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Models\ListTasks;
use App\Models\Tasks;
use App\Models\UserTasks;
use Illuminate\Http\Request;

class ListTaskController extends Controller
{
    public function store(Request $request){
        $data = $request->validate(['dashboard_id' => 'required|integer',
            'desk_id' => 'required|integer', 'title' => 'required|string', 'done' => 'nullable|boolean']);

        $list = ListTasks::where('dashboard_id', $data['dashboard_id'])->where('desk_id', $data['desk_id'])->first();

        return Tasks::create([
            'title' => $data['title'],
            'list_task_id' => $list->id,
            'done' => $data['done']
        ]);
    }

    public function update(Request $request){
        $data = $request->validate(['id' => 'required|integer','title' => 'required|string', 'emoji' => 'nullable',
            'data_start' => 'nullable|date_format:Y-m-d H:i:s', 'data_end' => 'nullable|date_format:Y-m-d H:i:s', 'done' => 'nullable|boolean']);
        $task = Tasks::where('id', $data['id'])->first();

        if (isset($data['title']) && $task->title !== $data['title']) {
            $task->title = $data['title'];
        } elseif (isset($data['emoji']) && $task->emoji !== $data['emoji']) {
            $task->emoji = $data['emoji'];
        } elseif (isset($data['data_start']) && $task->data_start !== $data['data_start']) {
            $task->data_start = $data['data_start'];
        } elseif (isset($data['data_end']) && $task->data_end !== $data['data_end']) {
            $task->data_end = $data['data_end'];
        } elseif (isset($data['done']) && $task->done !== $data['done']) {
            $task->done = $data['done'];
        }

        $task->save();
        return response()->json(['status' => 200, 'task' => $task]);
    }

    public function createList(Request $request){
        $data = $request->validate(['dashboard_id' => 'required|integer', 'desk_id' => 'required|integer', 'title' => 'required|string']);
        return ListTasks::create($data);
    }

    public function getTasks(Request $request){
        $data = $request->validate(['dashboard_id' => 'required|integer', 'desk_id' => 'required|integer']);
        if($list = ListTasks::where('dashboard_id', $data['dashboard_id'])->where('desk_id', $data['desk_id'])->first()){
            $tasks = Tasks::where('list_task_id', $list->id)->get();
            return response()->json(['list' => $list, 'tasks' => $tasks]);
        }
        else{
            return response()->json(['items' => null]);
        }
    }

    public function addUsers(Request $request){
        $data = $request->validate(['task_id' => 'required|integer', 'desk_id' => 'required|integer', 'user_id' => 'required|integer']);
        if (UserTasks::where('task_id', $data['task_id'])->where('desk_id', $data['desk_id'])->where('user_id', $data['user_id'])->first()) return false;

        UserTasks::create([
            'task_id' => $data['task_id'],
            'desk_id' => $data['desk_id'],
            'user_id' => $data['user_id'],
        ]);

        $users = UserTasks::with('getUsers')->where('task_id', $data['task_id'])
            ->whereHas('getUsers', function ($query) use ($data){
                $query->where('task_id', $data['task_id']);
            })->get();
        return response()->json($users);
    }
}
