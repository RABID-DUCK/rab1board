<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Models\User;
use App\Models\UserDashboards;
use App\Models\UserDesks;
use Illuminate\Http\Request;

class UserDeskController extends Controller
{
    public function getUsers(Request $request){
        $data = $request->validate(['desk_id' => 'required|integer']);

        return UserDesks::with('userDesks')->where('desk_id', $data['desk_id'])
            ->whereHas('userDesks', function ($query) use ($data) {
                $query->where('desk_id', $data['desk_id']);
            })->get();
    }

    public function addUser(Request $request){
        $data = $request->validate(['desk_id' => 'required|integer', 'user_id' => 'required|integer']);
        if($user = User::where('id', $data['user_id'])->first()){
            if($userDash = UserDashboards::where('user_id', $user->id)->first()){
                if(!$userDash->invited) return response()->json(['message' => 'Пользователя не существует в этом проекте!']);
                if($has = UserDesks::where('desk_id', $data['desk_id'])->where('user_id', $data['user_id'])->first()){
                    return $has->delete();
                }

                UserDesks::create([
                    'desk_id' => $data['desk_id'],
                    'user_id' => $data['user_id']
                ]);
                $users = UserDesks::with('userDesks')->where('desk_id', $data['desk_id'])
                    ->whereHas('userDesks', function ($query) use ($data){
                        $query->where('desk_id', $data['desk_id']);
                    })->get();

                return response()->json(['users' => $users]);
            }
        }
    }
}
