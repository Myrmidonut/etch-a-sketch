import React, { Component } from 'react';

class Navbar extends Component {
  constructor (props) {
    super(props)
  }

  componentDidMount() {
    document.getElementById("save").addEventListener("click", this.save);

    document.getElementById("delete").addEventListener("click", e => {
      e.preventDefault();

      this.props.delete();
    });

    document.getElementById("reset").addEventListener("click", e => {
      e.preventDefault();

      this.props.createGrid();
    });

    document.getElementById("registerForm").addEventListener("submit", e => {
      e.preventDefault();

      this.props.register();
    });

    document.getElementById("loginForm").addEventListener("submit", e => {
      e.preventDefault();

      this.props.login();
    });

    document.getElementById("account").addEventListener("click", e => {
      e.preventDefault();

      this.props.account();
    });
  }

  render() {
    let buttons = null;
    let home = null;

    if (this.props.home === "Drawingboard") {
      home = (
        "Gallery"
      )

      buttons = (
        <div id="interface">
          <a href="/" alt="Save" id="save" onClick={this.props.save}>Save</a>
          <a href="/" alt="Delete" id="delete" onClick={this.props.delete}>Delete</a>
          <a href="/" alt="Reset" id="reset">Reset</a>
          <a href="/" alt="Settings" id="settings" onClick={this.props.settings}>Settings</a>
        </div>
      )
    } else if (this.props.home === "Gallery") {
      home = (
        "Drawingboard"
      )

      buttons = (
        <div id="interface">
          <a href="/" alt="My Drawings">My Drawings</a>
          <a href="/" alt="Popular">Popular</a>
          <a href="/" alt="Recent">Recent</a>
        </div>
      )
    }

    return (
      <div id="navbar">
        <div id="gallery">
          <a href="/" alt="Gallery" id="galleryButton">{home}</a>
        </div>

        {buttons}
        
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

          <a href="/" alt="Logout">Logout</a>

          <a href="/api/account" alt="Account" id="account">Account</a>
        </div>
      </div>
    )
  }
}

export default Navbar;