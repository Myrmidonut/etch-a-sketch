import React, { Component } from "react";

class Modal extends Component {
  render() {
    return (
      <div id="accountModal">
        <div id="modal-content">
          <span id="closeModal">&times;</span>

          <div id="accountForms">
            <form id="registerForm">
              <input className="accountForm" name="name" placeholder="Username"></input>
              <input className="accountForm" type="email" name="email" placeholder="Email"></input>
              <input className="accountForm" type="password" name="password" placeholder="Password"></input>
              <input className="accountForm" type="password" name="c_password" placeholder="Confirm Password"></input>
              <input type="submit" id="submitRegister" value="Register"></input>
            </form>

            <form id="loginForm">
              <input className="accountForm" type="email" name="email" placeholder="Email"></input>
              <input className="accountForm" type="password" name="password" placeholder="Password"></input>
              <input type="submit" id="submitLogin" value="Login"></input>
            </form>

            {/*<div>
              <button id="logout">Logout</button>
              <button id="accountDetails" onClick={this.props.accountDetails}>Account</button>
            </div>*/}
          </div>
        </div>
      </div>
    )
  }
}

export default Modal;