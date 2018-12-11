<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateUsersTable extends Migration {
  /**
   * Run the migrations.
   *
   * @return void
   */

  public function up() {
    Schema::create('users', function (Blueprint $table) {
      $table->increments('id');
      $table->string('name');
      $table->string('email')->unique();
      $table->timestamp('email_verified_at')->nullable();
      $table->string('password');
      $table->rememberToken();
      $table->timestamps();

      $table->integer("default_grid_size")->default("32");
      $table->string("default_colors")->default("green white");
      $table->string("default_intensity")->default("0.1");
      $table->string("default_shape")->default("square");
    });
  }

  /**
   * Reverse the migrations.
   *
   * @return void
   */
  
  public function down() {
    Schema::dropIfExists('users');
  }
}