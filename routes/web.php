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

Route::get('/', function () {
    return view('main.main');
})->name('board.index');

Route::group(['prefix' => 'backend'], function (){
    Route::get('/admin', '\App\Http\Controllers\MainController@index')->name('backend.index');
    Route::get('/langs', '\App\Http\Controllers\LangsController@index')->name('backend.langs.index');

});
