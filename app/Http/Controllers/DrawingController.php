<?php

namespace App\Http\Controllers;

//use Illuminate\Http\Request;
//use App\Drawing;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\User;
use App\Drawing;
use Illuminate\Support\Facades\Auth;
use Validator;

class DrawingController extends Controller {
  public function save(Request $request) {
    $drawing = new Drawing;

    $drawing->grid_size = $request->grid_size;
    $drawing->opacity = json_encode($request->opacity);
    $drawing->color = json_encode($request->color);
    $drawing->background_color = $request->background_color;
    $drawing->shape = $request->shape;
    $drawing->owner = $request->owner;
    $drawing->title = $request->title;

    $drawing->save();

    return("saved" . $drawing);
  }

  public function personal($id) {
    $personaldrawings = Drawing::where("owner", $id)->get();

    return response()->json($personaldrawings);
  }

  public function all() {
    //$alldrawings = Drawing::all();

    $latestdrawings = Drawing::orderBy("created_at", "desc")->take(5)->get();

    //return response()->json([$alldrawings, $latestdrawings]);
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