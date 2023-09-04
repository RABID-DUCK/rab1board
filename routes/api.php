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
Route::post('/user/login', [\App\Http\Controllers\API\Auth\AuthController::class, 'login']);
Route::post('/user/register', [\App\Http\Controllers\API\Auth\AuthController::class, 'register']);
Route::post('/user/logout', [\App\Http\Controllers\API\Auth\AuthController::class, 'logout'])->middleware('token');
Route::post('/user/getUser', [\App\Http\Controllers\API\Auth\AuthController::class, 'getUser'])->middleware('token');
// Конец аутентификации

Route::get('/langs/{id}', '\App\Http\Controllers\LangsController@show');
Route::get('/user/{id}', '\App\Http\Controllers\UserController@show');

Route::post('/dashboard/create', '\App\Http\Controllers\API\DashboardController@store'); // создать проект
Route::post('/dashboard/rename', '\App\Http\Controllers\API\DashboardController@update'); // переименовать проект
Route::post('/dashboard/delete', '\App\Http\Controllers\API\DashboardController@delete'); // удалить проект
Route::post('/dashboard/addUser', '\App\Http\Controllers\API\DashboardController@addUser'); // добавить пользователя/ей на проект
Route::post('/dashboard/confirmInvite', '\App\Http\Controllers\API\DashboardController@confirmInvite'); // принятие приглашения на проект. Отправлять 1 либо 0
Route::get('/getDashboards', '\App\Http\Controllers\API\DashboardController@getDashboards'); // получить проекты

Route::post('/column/create', '\App\Http\Controllers\API\ColumnController@store'); // создать колонку
Route::post('/column/rename', '\App\Http\Controllers\API\ColumnController@update'); // переименовать колонку
Route::post('/column/delete', '\App\Http\Controllers\API\ColumnController@delete'); // удалить колонку
Route::post('/column/get', '\App\Http\Controllers\API\ColumnController@getColumns'); // получить колонки проекта
Route::post('/column/getDesks', '\App\Http\Controllers\API\ColumnController@getDesks'); // получить задачи колонки

Route::post('/desk/create', '\App\Http\Controllers\API\DeskController@store'); // создать задачу
Route::post('/desk', '\App\Http\Controllers\API\DeskController@outputDesks'); // вывести доски с их колонками
Route::get('/modalDesk', '\App\Http\Controllers\API\DeskController@show'); // показать доску
Route::post('/modalUpdate', '\App\Http\Controllers\API\DeskController@update'); // обновить данные модального окна
Route::post('/addImages', '\App\Http\Controllers\API\DeskController@addImages'); // добавить картинки с дропзоны
Route::post('/addFiles', '\App\Http\Controllers\API\DeskController@addFiles'); // добавить файлы с дропзоны
Route::post('/addUserDesk', '\App\Http\Controllers\API\DeskController@addUser'); // добавить пользователя на задачу
Route::post('/desk/delete', '\App\Http\Controllers\API\DeskController@delete'); // удалить задачу
Route::get('/desk/{id}', '\App\Http\Controllers\DeskController@show'); // показать одну доску(без всего)

Route::post('/saveTask', '\App\Http\Controllers\API\ListTaskController@store'); // сохранить подзадачу
Route::post('/createList', '\App\Http\Controllers\API\ListTaskController@createList'); // создать чек-лист(список подзадач для задачи)
Route::post('/list/delete', '\App\Http\Controllers\API\ListTaskController@delete'); // удалить чек-лист
Route::post('/addUsersTask', '\App\Http\Controllers\API\ListTaskController@addUsers'); // добавить пользователей на подзадачу

Route::post('/updateTask', '\App\Http\Controllers\API\ListTaskController@update'); // обновить подзадачу
Route::post('/task/delete', '\App\Http\Controllers\API\ListTaskController@deleteTask'); // обновить подзадачу
Route::get('/getTasks', '\App\Http\Controllers\API\ListTaskController@getTasks'); // получить подзадачи для задачи

Route::get('/colors', [\App\Http\Controllers\API\ColorController::class, 'index']); // вывести все цвета
Route::get('/colors/{color}/{desk}', [\App\Http\Controllers\API\ColorController::class, 'addColor']); // добавить цвет обложки для задачи

Route::get('/getColumns/{dashboard_id}', [\App\Http\Controllers\API\ColumnController::class, 'index']); // получить колонку задачи
Route::get('/moveColumn/{dashboard}/{desk}/{item_id}/{column_id}',
    [\App\Http\Controllers\API\ColumnController::class, 'moveColumn']); // изменить колонку у задачи

Route::post('/addComment', '\App\Http\Controllers\API\CommentsController@addComment'); // добавить комментарий к задаче
Route::post('/comment/update', '\App\Http\Controllers\API\CommentsController@update'); // обновить данные комментарий
Route::post('/comment/delete', '\App\Http\Controllers\API\CommentsController@delete'); // удалить комментарий
