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

    document.getElementById("settingsForm").addEventListener("submit", e => {
      console.log("settings")
      e.preventDefault();

      if (document.getElementById("defaultcheckbox").checked === true) {
        console.log("default settings")
        this.props.setDefaultSettings();
      } else {
        console.log("current settings");
        this.props.setCurrentSettings();
      }
    });

    document.getElementById("registerForm").addEventListener("submit", e => {
      e.preventDefault();
      console.log("register")

      this.props.register();
    });

    document.getElementById("loginForm").addEventListener("submit", e => {
      console.log("login")
      e.preventDefault();

      this.props.login();
    });

    document.getElementById("accountLink").addEventListener("click", e => {
      console.log("account");
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

          <form id="settingsForm">
            Grid Size:
            <input type="range" min="5" max="50" defaultValue="20" name="grid_size" id="grid_size"/>
            Intensity:
            <input type="range" min="0.1" max="1.0" step="0.1" defaultValue="0.1" name="intensity" id="intensity" />
            <input type="text" name="colors" id="colors" placeholder="colors" id="colors" />
            <select name="shape" id="shape">
              <option value="square" className="shape">Square</option>
              <option value="round" className="shape">Round</option>
            </select><br />
            Set as Default:
            <input type="checkbox" value="true" id="defaultcheckbox" />
            <input type="submit" id="submitSettings" value="Save" />
          </form>

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

          <a href="/api/account" alt="Account" id="accountLink">Account</a>
        </div>
      </div>
    )
  }
}

export default Navbar;