<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

use App\Drawing;

class DrawingController extends Controller {
  public function show() {
    return "show board";
  }

  public function save(Request $request) {
    //$method = $request->all();
    
    //return($method);

    //$data = json_encode($request->all());

    $drawing = new Drawing;

    $drawing->data = "hi"; //$data;

    $drawing->save();
  }

  public function delete() {
    return "delete board";
  }

  public function reset() {
    return "reset board";
  }

  public function settings() {
    return "show settings";
  }

  public function settingsupdate() {
    return "edit settings";
  }
}