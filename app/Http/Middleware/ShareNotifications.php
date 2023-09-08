<?php

namespace App\Http\Middleware;

use App\Models\Notification;
use Closure;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\View;
use Symfony\Component\HttpFoundation\Response;

class ShareNotifications
{
    /**
     * Handle an incoming request.
     *
     * @param  \Closure(\Illuminate\Http\Request): (\Symfony\Component\HttpFoundation\Response)  $next
     */
    public function handle(Request $request, Closure $next): Response
    {
//        if (Auth::check()) {
//            $count_not = Notification::where('user_id', Auth::user()->id)->where('read', true)->count();
//        } else {
//            $count_not = 0;
//        }
//
//        View::share('count_not', $count_not);

        return $next($request);
    }
}
