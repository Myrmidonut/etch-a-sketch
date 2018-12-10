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
      $table->string("username");
      $table->string("email");
      $table->string("password");
      $table->integer("default_grid_size");
      $table->string("default_colors");
      $table->integer("default_intensity");
      $table->string("default_shape");
      $table->string("drawings");
      $table->string("favorites");
      $table->string("likes");
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