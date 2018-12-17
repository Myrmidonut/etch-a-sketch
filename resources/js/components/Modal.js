import React, { Component } from "react";

class Modal extends Component {
  render() {
    return (
      <div id="myModal" className="modal">
        <div className="modal-content">
          <span className="close">&times;</span>

          <div id="account">
            <form id="registerForm">
              <input name="name" placeholder="Username"></input>
              <input type="email" name="email" placeholder="Email"></input>
              <input type="password" name="password" placeholder="Password"></input>
              <input type="password" name="c_password" placeholder="Confirm Password"></input>
              <input type="submit" id="submitRegister" value="Register"></input>
            </form>

            <form id="loginForm">
              <input type="email" name="email" placeholder="Email"></input>
              <input type="password" name="password" placeholder="Password"></input>
              <input type="submit" id="submitLogin" value="Login"></input>
            </form>

            <br />

            <a href="/" alt="Logout">Logout</a>

            <br />

            <a href="/api/account" alt="Account" id="accountLink">Account</a>
          </div>
        </div>
      </div>
    )
  }
}

export default Modal;