<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\MailController;
use App\Http\Controllers\UserController;
use App\Http\Controllers\AlbumController;
use App\Http\Controllers\DashboardController;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::get('/user', function (Request $request) {
    return auth()->user();
});

Route::group(['prefix' => 'albums', 'middleware' => 'auth:sanctum'], function () {
    Route::get('/', [AlbumController::class, 'index']);
    Route::post('/store', [AlbumController::class, 'store']);
    Route::get('/edit/{id}', [AlbumController::class, 'edit']);
    Route::post('/update', [AlbumController::class, 'update']);
    Route::post('/delete/{id}', [AlbumController::class, 'destroy']);
    Route::post('/images/store', [AlbumController::class, 'storeImages']);
    Route::get('/images/get/{id}', [AlbumController::class, 'getImages']);
    Route::post('/images/delete', [AlbumController::class, 'deleteImage']);
});

Route::group(['prefix' => 'portfolio'], function () {
    Route::get('/', [AlbumController::class, 'getPortfolio']);
    Route::get('/images/{path}', [AlbumController::class, 'getPortfolioImages']);
    Route::get('/images/{path}/download', [AlbumController::class, 'downloadPortfolioImages']);
});

Route::group(['prefix' => 'admin'], function () {
    Route::post('/login', [UserController::class, 'login']);
    Route::post('/logout', [UserController::class, 'logout']);
});

Route::post('/user/update', [UserController::class, 'update'])->middleware('auth:sanctum');
Route::post('/sendMail', [MailController::class, 'sendEmail']);
Route::get('/dashboard', [DashboardController::class, 'index'])->middleware('auth:sanctum');