<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class AccountController extends Controller {
  public function login() {
    return "login";
  }

  public function logout() {
    return "logout";
  }

  public function register() {
    return "register";
  }

  public function account() {
    return "account details";
  }
}