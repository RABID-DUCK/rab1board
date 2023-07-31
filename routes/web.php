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
});

Auth::routes();

    Route::group(['namespace' => 'backend'], function (){
        Route::get('/admin', [\App\Http\Controllers\MainController::class, 'index'])->name('backend.index');

        Route::get('/langs', '\App\Http\Controllers\LangsController@index')->name('backend.langs.index');
        Route::post('/langs/create', '\App\Http\Controllers\LangsController@store')->name('backend.langs.create');
        Route::delete('/langs/delete/{id}', '\App\Http\Controllers\LangsController@delete')->name('backend.langs.delete');
        Route::patch('/langs/update', '\App\Http\Controllers\LangsController@update')->name('backend.langs.update');
    });

