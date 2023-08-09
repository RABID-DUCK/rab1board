<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});

Route::get('/langs/{id}', '\App\Http\Controllers\LangsController@show');
Route::get('/user/{id}', '\App\Http\Controllers\UserController@show');
Route::get('/desk/{id}', '\App\Http\Controllers\DeskController@show');
Route::post('/dashboard/create', '\App\Http\Controllers\API\DashboardController@store');
Route::post('/column/create', '\App\Http\Controllers\API\ColumnController@store');
Route::post('/desk/create', '\App\Http\Controllers\API\DeskController@store');
