<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateDrawingsTable extends Migration {
  /**
   * Run the migrations.
   *
   * @return void
   */
  public function up() {
    Schema::create('drawings', function (Blueprint $table) {
      $table->increments('id');
      $table->string("data");
      $table->timestamp("updated_at");
      $table->timestamp("created_at");
      
      $table->integer("grid_size");
      $table->string("opacity");
      $table->string("color");
      $table->string("background_color");
      $table->string("shape");
    });
  }

  /**
   * Reverse the migrations.
   *
   * @return void
   */
  public function down() {
    Schema::dropIfExists('drawings');
  }
}