<?php

use App\Http\Controllers\Api\AuthController;
use App\Http\Controllers\Api\LikeController;
use App\Http\Controllers\Api\PostController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::post('/signup', [AuthController::class, 'signup']);
Route::post('/login', [AuthController::class, 'login']);

Route::middleware('auth:sanctum')->group(function () {
    Route::get('/user', function (Request $request) {
        return $request->user();
    });
    Route::post('/logout', [AuthController::class, 'logout']);

    Route::prefix('posts')->group(function () {
        Route::get('/', [PostController::class, 'index']);
        Route::post('/', [PostController::class, 'store']);
        Route::get('/search', [PostController::class, 'search']);
        Route::post('{post}/like', [LikeController::class, 'store']);
        Route::delete('{post}/unlike', [LikeController::class, 'destroy']);
    });

    Route::prefix('liked-posts')->group(function () {
        Route::get('/', [LikeController::class, 'index']);
        Route::delete('/', [LikeController::class, 'destroy']);
    });
});
