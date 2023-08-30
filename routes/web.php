<?php

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

Route::get('/', function (){
    return view('main.main');
});

Auth::routes();


Route::group(['namespace' => 'frontend'], function (){
    Route::get('/', [\App\Http\Controllers\HomeController::class, 'index'])->name('board.index');
    Route::get('/dashboard/{id}', [\App\Http\Controllers\DashboardController::class, 'show'])->name('board.show');
});

Auth::routes();

Route::group(['prefix' => 'backend', 'middleware' => 'isAdmin'], function(){
        Route::get('/admin', [App\Http\Controllers\MainController::class, 'index'])->name('backend.index');

        Route::group(['namespace' => 'langs'], function (){
            Route::get('/langs', '\App\Http\Controllers\LangsController@index')->name('backend.langs.index');
            Route::post('/langs/create', '\App\Http\Controllers\LangsController@store')->name('backend.langs.create');
            Route::delete('/langs/delete/{id}', '\App\Http\Controllers\LangsController@delete')->name('backend.langs.delete');
            Route::patch('/langs/update', '\App\Http\Controllers\LangsController@update')->name('backend.langs.update');
        });

        Route::group(['namespace' => 'users'], function (){
            Route::get('/users', '\App\Http\Controllers\UserController@index')->name('backend.users.index');
            Route::post('/users/create', '\App\Http\Controllers\UserController@store')->name('backend.users.create');
            Route::delete('/users/delete/{id}', '\App\Http\Controllers\UserController@delete')->name('backend.users.delete');
            Route::patch('/users/update', '\App\Http\Controllers\UserController@update')->name('backend.users.update');
        });

        Route::group(['namespace' => 'dashboards'], function (){
            Route::get('/dashboards', '\App\Http\Controllers\DashboardController@index')->name('backend.dashboards.index');
            Route::post('/dashboards/create', '\App\Http\Controllers\DashboardController@store')->name('backend.dashboards.create');
            Route::delete('/dashboards/delete/{id}', '\App\Http\Controllers\DashboardController@delete')->name('backend.dashboards.delete');
            Route::patch('/dashboards/update', '\App\Http\Controllers\DashboardController@update')->name('backend.dashboards.update');
        });

        Route::group(['namespace' => 'desks'], function (){
            Route::get('/desks', '\App\Http\Controllers\DeskController@index')->name('backend.desks.index');
            Route::post('/desks/create', '\App\Http\Controllers\DeskController@store')->name('backend.desks.create');
            Route::delete('/desks/delete/{id}', '\App\Http\Controllers\DeskController@delete')->name('backend.desks.delete');
            Route::patch('/desks/update', '\App\Http\Controllers\DeskController@update')->name('backend.desks.update');
        });
});

Route::view('/{path?}', 'app')->where('path', '.*');;
Route::get('/{path?}', function () {
    return view('layouts.app');
})->where('path', '.*');
