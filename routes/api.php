<?php

use Illuminate\Http\Request;

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

Route::middleware('auth:api')->get('/user', function (Request $request) {
    return $request->user();
});

Route::prefix('/v1')->namespace('Api\v1')->middleware('jwt.auth', 'api-header')->group(function(){
    Route::prefix('user')->group(function(){
        Route::get('/{id}', 'UserController@find');
        Route::post('/follow/{id}', 'UserController@follow');
        Route::post('/unfollow/{id}', 'UserController@unfollow');
    });

    Route::prefix('category')->group(function(){
        Route::get('/all', 'CategoryController@list');
        Route::get('/{id}', 'CategoryController@find');
    });
});

Route::prefix('/v1')->namespace('Api\v1')->middleware('api-header')->group(function(){
    Route::prefix('user')->group(function(){
        Route::post('/login', 'UserController@login');
        Route::post('/register', 'UserController@register');
    });
});
