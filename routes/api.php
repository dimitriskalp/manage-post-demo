<?php

use App\Http\Controllers\Api\AuthController;
use App\Http\Controllers\Api\LikeController;
use App\Http\Controllers\Api\PostController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

//Route::get('/user', function (Request $request) {
//    return $request->user();
//})->middleware('auth:sanctum');

Route::middleware('auth:sanctum')->group(function () {
    Route::get('/user', function (Request $request) {
        return $request->user();
    });
    Route::post('/logout', [AuthController::class, 'logout']);
});

Route::post('/signup', [AuthController::class, 'signup']);
Route::post('/login', [AuthController::class, 'login']);


Route::get('/posts', [PostController::class, 'index']);
Route::middleware('auth:sanctum')->post('/posts', [PostController::class, 'store']);
Route::middleware('auth:sanctum')->post('/posts/{post}/like', [LikeController::class, 'store']);
Route::middleware('auth:sanctum')->get('/liked-posts', [LikeController::class, 'index']);
Route::middleware('auth:sanctum')->delete('/liked-posts', [LikeController::class, 'destroy']);
Route::middleware('auth:sanctum')->delete('/posts/{post}/unlike', [LikeController::class, 'destroy']);
