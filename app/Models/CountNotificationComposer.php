<?php

namespace App\Models;

use Illuminate\Support\Facades\Auth;
use Illuminate\View\View;

class CountNotificationComposer
{
    public function compose(View $view)
    {
        if (Auth::check()) {
            $count_not = Notification::where('user_id', Auth::user()->id)->where('read', false)->count();
        } else {
            $count_not = 0;
        }

        $view->with('count_not', $count_not);
    }
}
