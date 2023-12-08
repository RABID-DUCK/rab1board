<?php

namespace App\Http\Controllers\API\Auth;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Testing\Fluent\Concerns\Has;

class AuthController extends Controller
{
    public function login(Request $request){
        $credentials = $request->validate([
            'email' => ['required', 'email'],
            'password' => ['required'],
            'checked' => 'required|boolean'
        ]);
        $checked = $credentials['checked'];
        unset($credentials['checked']);

        if (Auth::attempt($credentials)){
            $user = User::where('email', $credentials['email'])->first();
            $token = Hash::make($user->createToken('token')->plainTextToken);
            $user->remember_token = $token;
            $user->save();
            Auth::login($user, $checked);
            $request->session()->regenerate();

            return response()->json(['access_token' => $token, 'user' => $user]);
        }

        return response()->json(['message' => "Логин или пароль неверны!"]);
    }

    public function register(Request $request){
        $credentials = $request->validate([
            'name' => 'required|string',
            'login' => 'required|string|unique:users',
            'email' => 'required|string|unique:users',
            'password' => 'required|string|confirmed',
        ]);

        $user = User::create($credentials);
        $token = Hash::make($user->createToken('token')->plainTextToken);
        $user->remember_token = $token;
        $user->save();
        Auth::login($user, true);
        $request->session()->regenerate();

        return response()->json(['access_token' => $token, 'user' => $user]);
    }

    public function logout(Request $request){
        $data = $request->validate(['id' => 'required|integer']);
        if($user = User::where('id', $data['id'])->first()){
            $user->remember_token = null;
            $user->save();

            Auth::logout();
            $request->session()->invalidate();
            $request->session()->regenerateToken();

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
