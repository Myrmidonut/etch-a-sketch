<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\User;
use App\Drawing;
use Illuminate\Support\Facades\Auth;
use Validator;

class PassportController extends Controller {
  public $successStatus = 200;

  public function login() {
    if (Auth::attempt([
        'email' => request('email'),
        'password' => request('password')
      ])) {
      $user = Auth::user();
      $success['token'] = $user->createToken('MyApp')->accessToken;

      return response()->json([
        "name" => $user->name,
        "id" => $user->id,
        "default_grid_size" => $user->default_grid_size,
        "default_intensity" => $user->default_intensity,
        "default_main_color" => $user->default_main_color,
        "default_background_color" => $user->default_background_color,
        "default_shape" => $user->default_shape,
        'success' => $success
      ], $this->successStatus);
    } else {
      return response()->json(['error' => 'Unauthorised'], 401);
    }
  }

  public function register(Request $request) {
    $validator = Validator::make($request->all(), [
      'name' => 'required',
      'email' => 'required|email',
      'password' => 'required',
      'c_password' => 'required|same:password',
    ]);

    if ($validator->fails()) {
      return response()->json(['error' => $validator->errors()], 401);            
    }

    $input = $request->all();
    $input['password'] = bcrypt($input['password']);
    $user = User::create($input);
    $success['token'] = $user->createToken('MyApp')->accessToken;
    $success['name'] = $user->name;

    return response()->json([
      "name" => $user->name,
      "id" => $user->id,
      'success' => $success
    ], $this->successStatus);
  }

  public function account() {
    $user = Auth::user();
    $drawings = Drawing::where("owner", $user->id)->get();

    return response()->json([$user, $drawings]);
  }

  public function savesettings(Request $request) {
    $user = Auth::user();

    $user->default_grid_size = $request->grid_size;
    $user->default_intensity = $request->intensity;
    $user->default_main_color = $request->main_color;
    $user->default_background_color = $request->background_color;
    $user->default_shape = $request->shape;

    $user->save();

    return ($user);
  }

  public function loadsettings() {
    $user = Auth::user();

    return response()->json([
      "default_grid_size" => $user->default_grid_size,
      "default_intensity" => $user->default_intensity,
      "default_main_color" => $user->default_main_color,
      "default_background_color" => $user->default_background_color,
      "default_shape" => $user->default_shape
    ], $this->successStatus);
  }
}