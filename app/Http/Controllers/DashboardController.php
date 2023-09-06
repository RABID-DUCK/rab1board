<?php

namespace App\Http\Controllers;

use App\Http\Requests\Desk\StoreRequest;
use App\Models\Columns;
use App\Models\Dashboards;
use App\Models\Desks;
use App\Models\User;
use App\Models\UserDashboards;
use Illuminate\Http\Request;
use Illuminate\Support\Carbon;

class DashboardController extends Controller
{
    public function index(){
        $dashboards = Dashboards::all();

        return view('backend.dashboards.index', compact('dashboards'));
    }

    public function show($id){
        if (!auth()->user()) return redirect()->route('login');
        $user = User::where('id', auth()->user()->id)->first();

        if($dashboard = Dashboards::where('id', $id)->first()){
            if(!UserDashboards::where('dashboard_id', $id)->where('user_id', auth()->user()->id)->first() ?? !UserDashboards::where('dashboard_id', $id)
                    ->where('user_id', auth()->user()->id)->first()->invited) return redirect()->route('board.index');

            $columns = Columns::where('dashboard_id', $id)->get();
            $desks = Desks::all();


            return view('dashboard.dashboard', compact('dashboard', 'user', 'columns', 'desks'));
        }

        return redirect()->route('board.index');
    }

    public function addUser(Request $request){
        $data = $request->validate(['user' => 'required|string', 'dashboard_id' => 'required|integer']);

        if($user = User::where('email', $data['user'])->first()){
            if($users = UserDashboards::where('dashboard_id', $data['dashboard_id'])->where('user_id', $user->id)->get()){
                foreach ($users as $userDash){
                    if(!$userDash->confirmed) return response()->json(['status' => 403,'message' => 'Приглашение уже было отправлено!']);
                }
            }

            UserDashboards::create([
                'user_id' => $user->id,
                'dashboard_id' => $data['dashboard_id'],
                'confirmed' => false
            ]);

            return response()->json(['status' => 200,'message' => 'Приглашение отправлено']);
        }
        else{
            return response()->json(['status' => 404,'message' => 'Пользователь не найден']);
        }
    }

    public function confirmInvite(Request $request){
        $data = $request->validate(['user_id' => 'required|integer', 'dashboard_id' => 'required|integer', 'invited' => 'required|boolean']);
        if($invite = UserDashboards::where('dashboard_id', $data['dashboard_id'])->where('user_id', $data['user_id'])->first()){
            $invite->invited = $data['invited'];
            $invite->save();
            return response()->json(['status' => 200]);
        }

        return response()->json(['message' => 'Произошла ошибка...попробуйте позже!']);
    }

    public function delete(Request $request){
        $id = $request->validate(['id' => 'required|integer']);
        if ($dash = Dashboards::where('id', $id)->first()){
            $dash->delete();
            return response()->json(['status' => 200]);
        }
        return response()->json(['message' => 'Произошла ошибка! Не найден проект...']);
    }

    public function getDashboards(Request $request){
        $user = User::where('remember_token', $request->bearerToken())->first();
        return Dashboards::where('user_id', $user->id)->get();
    }
}
