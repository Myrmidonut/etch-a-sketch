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
  // login
  // logout
  // register
  // account details

Route::post("/login", "PassportController@login");
Route::post("/register", "PassportController@register");
Route::group(["middleware" => "auth:api"], function() {
  Route::post("/account", "PassportController@account");
  Route::post("/settings", "PassportController@savesettings");
});

// drawingboard:
  // show
  // save
  // delete
  // reset
  // show settings
  // save settings

Route::get("/show", "DrawingController@show");
Route::post("/save", "DrawingController@save");
Route::delete("/delete", "DrawingController@delete");
//Route::get("/reset", "DrawingController@reset");
//Route::get("/settings", "DrawingController@settings");
//Route::post("/settings", "DrawingController@settingsupdate");

// gallery:
  // my drawings
  // popular
  // recent

Route::get("/mydrawings", "GalleryController@mydrawings");
Route::get("/popular", "GalleryController@popular");
Route::get("/recent", "GalleryController@recent");