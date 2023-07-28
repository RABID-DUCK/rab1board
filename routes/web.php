<?php

use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "web" middleware group. Make something great!
|
*/



Auth::routes();

Route::group(['middleware' => 'auth'], function(){
    Route::get('/login', function (){
        return view('auth.login');
    })->name('login');

    Route::get('/register', function (){
        return view('auth.register');
    })->name('register');
    Route::get('/logout', function (){
        return view('main.main');
    })->name('logout');

    Route::get('/', [App\Http\Controllers\HomeController::class, 'index'])->name('board.index');

    Route::group(['prefix' => 'backend'], function (){
        Route::get('/admin', '\App\Http\Controllers\MainController@index')->name('backend.index');

        Route::get('/langs', '\App\Http\Controllers\LangsController@index')->name('backend.langs.index');
        Route::post('/langs/create', '\App\Http\Controllers\LangsController@store')->name('backend.langs.create');
        Route::delete('/langs/delete/{id}', '\App\Http\Controllers\LangsController@delete')->name('backend.langs.delete');
        Route::patch('/langs/update', '\App\Http\Controllers\LangsController@update')->name('backend.langs.update');
    });
});

