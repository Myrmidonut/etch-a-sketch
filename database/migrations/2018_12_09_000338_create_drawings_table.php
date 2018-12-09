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
      $table->increments('drawing_id');
      $table->timestamps("created_at");
      $table->timestamps("updated_at");
      $table->string("created_by");
      $table->string("title");
      $table->integer("likes");
      $table->integer("favorites");
      
      $table->integer("grid_size");
      $table->string("colors");
      $table->integer("intensity");
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

/*
drawing_id iterator
created_by account_id
created_at timestamp
updated_at timestamp
title string
likes integer
favorites integer
squares array
grid_size integer
colors string
intensity integer
shape string
*/