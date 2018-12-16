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

// account:

Route::post("/login", "PassportController@login");
Route::post("/register", "PassportController@register");
Route::group(["middleware" => "auth:api"], function() {
  Route::get("/account", "PassportController@account");
  Route::post("/settings", "PassportController@savesettings");
  Route::get("/settings", "PassportController@loadsettings");
});

// drawingboard:

Route::group(["middleware" => "auth:api"], function() {
  Route::post("/save", "DrawingController@save");
  Route::post("/delete/{id}", "DrawingController@delete");
  
});

// gallery:

Route::get("/drawings/{id}", "DrawingController@one");
Route::get("/drawings", "DrawingController@all");
Route::get("/drawings/personal/{id}", "DrawingController@personal");