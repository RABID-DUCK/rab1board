<?php

namespace App\Providers;

use App\Models\User;
use Illuminate\Support\ServiceProvider;

class BackendServiceProvider extends ServiceProvider
{
    /**
     * Register services.
     */
    public function register(): void
    {
        view()->composer('backend.index', function($view){
            $user = User::query()->where('id', auth()->user()->id)->first();
            $view->with('user', $user);
        });
    }

    /**
     * Bootstrap services.
     */
    public function boot(): void
    {
        //
    }
}
