import React, { Component } from "react";

class Modal extends Component {
  render() {
    return (
      <div id="accountModal">
        <div id="modal-content">
          <span id="closeModal">&times;</span>

          <div id="accountForms">
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

            <button id="logout">Logout</button>

            <br />

            <button id="accountDetails" onClick={this.props.accountDetails}>Account</button>
          </div>
        </div>
      </div>
    )
  }
}

export default Modal;