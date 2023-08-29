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

Route::post('/user/login', [\App\Http\Controllers\API\Auth\AuthController::class, 'login'])->middleware('token');
Route::post('/user/register', [\App\Http\Controllers\API\Auth\AuthController::class, 'register']);
Route::post('/user/logout', [\App\Http\Controllers\API\Auth\AuthController::class, 'logout'])->middleware('token');
Route::post('/user/getUser', [\App\Http\Controllers\API\Auth\AuthController::class, 'getUser'])->middleware('token');


Route::group(['middleware' => 'token'], function(){
    Route::get('/langs/{id}', '\App\Http\Controllers\LangsController@show');
    Route::get('/user/{id}', '\App\Http\Controllers\UserController@show');

    Route::post('/dashboard/create', '\App\Http\Controllers\API\DashboardController@store');
    Route::post('/dashboard/rename', '\App\Http\Controllers\API\DashboardController@update');

    Route::post('/column/create', '\App\Http\Controllers\API\ColumnController@store');
    Route::post('/column/rename', '\App\Http\Controllers\API\ColumnController@update');

    Route::post('/desk/create', '\App\Http\Controllers\API\DeskController@store');
    Route::post('/modalUpdate', '\App\Http\Controllers\API\DeskController@update');
    Route::post('/addImages', '\App\Http\Controllers\API\DeskController@addImages');
    Route::get('/modalDesk', '\App\Http\Controllers\API\DeskController@show');
    Route::post('/desk', '\App\Http\Controllers\API\DeskController@outputDesks');
    Route::get('/desk/{id}', '\App\Http\Controllers\DeskController@show');

    Route::post('/saveTask', '\App\Http\Controllers\API\ListTaskController@store');
    Route::post('/createList', '\App\Http\Controllers\API\ListTaskController@createList');
    Route::get('/getTasks', '\App\Http\Controllers\API\ListTaskController@getTasks');

    Route::get('/colors', [\App\Http\Controllers\API\ColorController::class, 'index']);
    Route::get('/colors/{color}/{desk}', [\App\Http\Controllers\API\ColorController::class, 'addColor']);

    Route::get('/getColumns/{dashboard}/{desk}', [\App\Http\Controllers\API\ColumnController::class, 'index']);
    Route::get('/moveColor/{dashboard}/{desk}/{item_id}/{column_id}', [\App\Http\Controllers\API\ColumnController::class, 'moveColumn']);
});
