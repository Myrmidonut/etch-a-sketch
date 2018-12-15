<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

use App\Drawing;

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

  public function all() {
    $alldrawings = Drawing::all();

    $latestdrawings = Drawing::orderBy("created_at", "desc")->take(5)->get();

    return response()->json([$alldrawings, $latestdrawings]);
  }

  public function one($id) {
    $drawing = Drawing::find($id);


  }
}