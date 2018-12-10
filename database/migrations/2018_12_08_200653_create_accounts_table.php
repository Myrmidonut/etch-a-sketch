<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateAccountsTable extends Migration {
  /**
   * Run the migrations.
   *
   * @return void
   */
  public function up() {
    Schema::create('accounts', function (Blueprint $table) {
      $table->increments('id');
      $table->timestamp("updated_at");
      $table->timestamp("created_at");
      $table->string("username");
      $table->string("email");
      $table->string("password");
      $table->integer("default_grid_size")->default("32");
      $table->string("default_colors")->default("green white");
      $table->integer("default_intensity")->default(0.1);
      $table->string("default_shape")->default("square");
      $table->string("drawings"); //array
      $table->string("favorites"); //array
      $table->string("likes"); //array
    });
  }

  /**
   * Reverse the migrations.
   *
   * @return void
   */
  public function down() {
    Schema::dropIfExists('accounts');
  }
}