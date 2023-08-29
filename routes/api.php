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

// Аутентификация
Route::post('/user/login', [\App\Http\Controllers\API\Auth\AuthController::class, 'login'])->middleware('token');
Route::post('/user/register', [\App\Http\Controllers\API\Auth\AuthController::class, 'register']);
Route::post('/user/logout', [\App\Http\Controllers\API\Auth\AuthController::class, 'logout'])->middleware('token');
Route::post('/user/getUser', [\App\Http\Controllers\API\Auth\AuthController::class, 'getUser'])->middleware('token');
// Конец аутентификации

Route::group(['middleware' => 'token'], function(){
    Route::get('/langs/{id}', '\App\Http\Controllers\LangsController@show');
    Route::get('/user/{id}', '\App\Http\Controllers\UserController@show');

    Route::post('/dashboard/create', '\App\Http\Controllers\API\DashboardController@store'); // создать проект
    Route::post('/dashboard/rename', '\App\Http\Controllers\API\DashboardController@update'); // переименовать проект
    Route::post('/dashboard/addUser', '\App\Http\Controllers\API\DashboardController@addUser'); // добавить пользователя/ей на проект

    Route::post('/column/create', '\App\Http\Controllers\API\ColumnController@store'); // создать колонку
    Route::post('/column/rename', '\App\Http\Controllers\API\ColumnController@update'); // переименовать колонку

    Route::post('/desk/create', '\App\Http\Controllers\API\DeskController@store'); // создать задачу
    Route::post('/modalUpdate', '\App\Http\Controllers\API\DeskController@update'); // обновить данные модального окна
    Route::post('/addImages', '\App\Http\Controllers\API\DeskController@addImages'); // добавить картинки с дропзоны
    Route::get('/modalDesk', '\App\Http\Controllers\API\DeskController@show'); // показать доску
    Route::post('/addUserDesk', '\App\Http\Controllers\API\DeskController@addUser'); // добавить пользователя на задачу
    Route::post('/desk', '\App\Http\Controllers\API\DeskController@outputDesks'); // вывести доски с их колонками
    Route::get('/desk/{id}', '\App\Http\Controllers\DeskController@show'); // показать одну доску(без всего)

    Route::post('/saveTask', '\App\Http\Controllers\API\ListTaskController@store'); // сохранить подзадачу
    Route::post('/createList', '\App\Http\Controllers\API\ListTaskController@createList'); // создать чек-лист(список подзадач для задачи)
    Route::get('/getTasks', '\App\Http\Controllers\API\ListTaskController@getTasks'); // получить подзадачи для задачи

    Route::get('/colors', [\App\Http\Controllers\API\ColorController::class, 'index']); // вывести все цвета
    Route::get('/colors/{color}/{desk}', [\App\Http\Controllers\API\ColorController::class, 'addColor']); // добавить цвет обложки для задачи

    Route::get('/getColumns/{dashboard}/{desk}', [\App\Http\Controllers\API\ColumnController::class, 'index']); // получить колонку задачи
    Route::get('/moveColor/{dashboard}/{desk}/{item_id}/{column_id}',
        [\App\Http\Controllers\API\ColumnController::class, 'moveColumn']); // изменить колонку у задачи
});
