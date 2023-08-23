<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Models\ListTasks;
use App\Models\Tasks;
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
}
