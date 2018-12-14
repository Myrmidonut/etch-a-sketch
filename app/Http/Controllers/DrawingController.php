<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

use App\Drawing;

class DrawingController extends Controller {
  public function show() {
    return "show board";
  }

  /*
  $table->increments('id');
  $table->integer("owner");
  $table->timestamp("updated_at");
  $table->timestamp("created_at");
  
  $table->integer("grid_size");
  $table->string("opacity");
  $table->string("color");
  $table->string("background_color");
  $table->string("shape");
  */

  /*
  grid_size: this.state.gridSize,
  opacity: this.state.opacity,
  color: this.state.color,
  background_color: this.state.backgroundColor,
  shape: this.state.shape,
  owner: this.state.accountId
  */

  public function save(Request $request) {
    //$method = $request->all();
    //return($method);

    //$data = json_encode($request->all());

    //$drawing = Drawing::updateOrCreate()

    $drawing = new Drawing;

    $drawing->grid_size = $request->grid_size;
    $drawing->opacity = json_encode($request->opacity);
    $drawing->color = json_encode($request->color);
    $drawing->background_color = $request->background_color;
    $drawing->shape = $request->shape;
    $drawing->owner = $request->owner;

    $drawing->save();

    return("saved" . $drawing);
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