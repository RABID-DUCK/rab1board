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
            return response()->json(['access_token' => $token]);
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
        return response()->json(['access_token' => $token]);
    }

    public function logout(Request $request){
        Auth::user()->tokens()->delete();
        return response()->json(['status' => 403]);
    }

    public function getUser(Request $request){
        $user = $request->user();
        return response()->json(['user' => $user]);
    }
}
