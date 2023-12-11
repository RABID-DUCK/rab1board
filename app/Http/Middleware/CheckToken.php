<?php

namespace App\Http\Middleware;

use App\Models\User;
use Closure;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Session;
use Symfony\Component\HttpFoundation\Response;

class CheckToken
{
    /**
     * Handle an incoming request.
     *
     * @param  \Closure(\Illuminate\Http\Request): (\Symfony\Component\HttpFoundation\Response)  $next
     */
    public function handle(Request $request, Closure $next): Response
    {
        $token = $request->bearerToken();
        if(!$token) return response()->json(['message' => 'The token is missing'], 401);

        Session::setId($request->headers->get('Cookie'));
        Session::start();

        $user = $request->user() ?? User::where('remember_token', $token)->first();
        if(!$user) return response()->json(['message' => 'This user not found'], 403);

        \Auth::login($user, true);
        $request->session()->regenerate();

        return $next($request);
    }
}
