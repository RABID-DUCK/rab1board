<?php

namespace App\Http\Controllers\API\Auth;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class AuthController extends Controller
{
    public function login(Request $request){
        $credetials = $request->validate([
            'email' => ['required', 'email'],
            'password' => ['required']
        ]);

        if (Auth::attempt($credetials)){
            $user = User::where('email', $credetials['email'])->first();
            $token = $user->createToken('token')->plainTextToken;
            $user->remember_token = $token;
            $user->save();
            return response()->json(['access_token' => $token, 'user' => $user]);
        }

        return response()->json(['message' => "Логин или пароль неверны!"]);
    }

    public function register(Request $request){
        $credentials = $request->validate([
            'name' => 'required|string',
            'login' => 'required|string|unique:users',
            'email' => 'required|string|unique:users',
            'password' => 'required|string|confirmed'
        ]);
        $user = User::create($credentials);
        $token = $user->createToken('token')->plainTextToken;
        $user->remember_token = $token;
        $user->save();

        return response()->json(['access_token' => $token, 'user' => $user]);
    }

    public function logout(Request $request){
        $data = $request->validate(['id' => 'required|integer']);
        if($user = User::where('id', $data['id'])->first()){
            $user->remember_token = null;
            $user->save();
            return response()->json(['status' => 401, 'message' => 'Unauthorized']);
        }else{
            return response()->json(['status' => 404, 'message' => 'Пользователь не найден']);
        }
    }

    public function getUser(Request $request){
        if($user = User::where('remember_token', $request->bearerToken())->first()){
            return response()->json(['user', $user]);
        }
        return response()->json(['message' => 'Пользователь не найден!']);
    }
}
