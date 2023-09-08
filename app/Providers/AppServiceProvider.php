<?php

namespace App\Providers;

use App\Models\Notification;
use Illuminate\Support\Facades\View;
use Illuminate\Support\ServiceProvider;

class AppServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     */
    public function register(): void
    {
        //
    }

    /**
     * Bootstrap any application services.
     */
    public function boot(): void
    {
        if(auth()->user()){
            $count_not = Notification::where('user_id', Auth()->user()->id)->where('read', true)->count();
            View::share('count_not', $count_not);
        }else{
            View::share('count_not', 0);
        }
    }
}
