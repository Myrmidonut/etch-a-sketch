<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\User;
use App\Drawing;
use Illuminate\Support\Facades\Auth;
use Validator;

class DrawingController extends Controller {
  public function save(Request $request) {
    $user = Auth::user()->id;

    if ($request->id == "null") {
      $drawing = new Drawing;

      $drawing->grid_size = $request->grid_size;
      $drawing->opacity = json_encode($request->opacity);
      $drawing->color = json_encode($request->color);
      $drawing->background_color = $request->background_color;
      $drawing->shape = $request->shape;
      $drawing->owner = $request->owner;
      $drawing->title = $request->title;

      $drawing->save();

      return response()->json(["message" => "saved"]);
    } else {
      $drawing = Drawing::find($request->id);

      if ($drawing->owner == $request->owner) {
        $drawing->grid_size = $request->grid_size;
        $drawing->opacity = json_encode($request->opacity);
        $drawing->color = json_encode($request->color);
        $drawing->background_color = $request->background_color;
        $drawing->shape = $request->shape;
        $drawing->owner = $request->owner;
        $drawing->title = $request->title;

        $drawing->save();

        return response()->json(["message" => "saved"]);
      } else {
        $drawing = new Drawing;

        $drawing->grid_size = $request->grid_size;
        $drawing->opacity = json_encode($request->opacity);
        $drawing->color = json_encode($request->color);
        $drawing->background_color = $request->background_color;
        $drawing->shape = $request->shape;
        $drawing->owner = $request->owner;
        $drawing->title = $request->title;

        $drawing->save();

        return response()->json(["message" => "saved"]);
      }
    }
  }

  public function personal($id) {
    $personaldrawings = Drawing::where("owner", $id)->orderBy("updated_at", "desc")->get();
    // ->take(5)

    return response()->json($personaldrawings);
  }

  public function all() {
    $alldrawings = Drawing::all();

    return response()->json($alldrawings);
  }

  public function latest() {
    $latestdrawings = Drawing::orderBy("updated_at", "desc")->get();
    // ->take(5)

    return response()->json($latestdrawings);
  }

  public function one($id) {
    $drawing = Drawing::find($id);

    return $drawing;
  }

  public function delete($id, Request $request) {
    $owner = $request->owner;
    $user = Auth::user()->id;

    if ($owner == $user) {
      $drawing = Drawing::find($id)->delete();

      return "success";
    } else {
      return "fail";
    }
  }
}