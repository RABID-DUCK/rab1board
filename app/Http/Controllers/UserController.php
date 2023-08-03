<?php

namespace App\Http\Controllers;

use App\Http\Requests\User\StoreRequest;
use App\Http\Requests\User\UpdateRequest;
use App\Models\Role;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;

class UserController extends Controller
{
    public function index(){
        $users = User::all();
        $roles = Role::all();

        return view('backend.users.index', compact('users', 'roles'));
    }

    public function show($id){
        $user = User::query()->where('id', $id)->first();
        $roles = Role::all();
        $userRole = $user->getRole;
        return response()->json(["user" => $user, "roles" => $roles, 'user_role' => $userRole]);
    }

    public function store(StoreRequest $request){
        $data = $request->validated();
        $data['password'] = Hash::make($data['password']);

        User::query()->create($data);

        return redirect()->route('backend.users.index');
    }

    public function update(UpdateRequest $request){
        $data = $request->validated();
        $user = User::query()->where('id', $data['user_id'])->first();
        $user->role_id = $data['role_id'];
        $user->save();
        $user->update($data);

        return redirect()->route('backend.users.index');
    }

    public function delete($id){
        User::query()->where('id', $id)->delete();
        return redirect()->route('backend.users.index');
    }
}
