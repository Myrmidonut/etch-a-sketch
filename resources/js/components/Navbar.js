import React, { Component } from 'react';

class Navbar extends Component {
  constructor (props) {
    super(props)

    this.updateGridSizeSlider = this.updateGridSizeSlider.bind(this);
    this.updateIntensitySlider = this.updateIntensitySlider.bind(this);
    this.saveSettings = this.saveSettings.bind(this);
  }

  saveSettings() {
    if (document.getElementById("defaultcheckbox").checked === true) {
      console.log("default settings")

      this.props.setDefaultSettings();
    } else {
      console.log("current settings");

      this.props.setCurrentSettings();
    }
  }

  componentDidUpdate() {
    //this.updateGridSizeSlider();
    //this.updateIntensitySlider();
  }

  componentDidMount() {
    document.getElementById("save").addEventListener("click", e => {
      e.preventDefault();
      this.props.save();
    });

    document.getElementById("delete").addEventListener("click", e => {
      e.preventDefault();
      this.props.delete();
    });

    document.getElementById("reset").addEventListener("click", e => {
      e.preventDefault();
      this.props.reset();
    });

    document.getElementById("registerForm").addEventListener("submit", e => {
      e.preventDefault();
      this.props.register();
    });

    document.getElementById("loginForm").addEventListener("submit", e => {
      e.preventDefault();
      this.props.login();
    });

    document.getElementById("accountLink").addEventListener("click", e => {
      e.preventDefault();
      this.props.account();
    });
  }

  updateGridSizeSlider() {
    document.getElementById("gridSizeValue").textContent = document.getElementById("gridSizeSlider").value;
  }

  updateIntensitySlider() {
    document.getElementById("intensityValue").textContent = document.getElementById("intensitySlider").value;
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
          <a href="/" alt="Save" id="save">Save</a>
          <a href="/" alt="Delete" id="delete">Delete</a>
          <a href="/" alt="Reset" id="reset">Reset</a>

          <form id="settingsForm">
            <span>Grid Size: </span>
            <span id="gridSizeValue">20</span>
            <br />
            <span id="gridSizeMin">5</span>
            <input type="range" min="5" max="50" defaultValue="20" name="grid_size" id="gridSizeSlider" onChange={this.updateGridSizeSlider} />
            <span id="gridSizeMax">50</span>
            <br />

            <span>Intensity: </span>
            <span id="intensityValue">0.1</span>
            <br />
            <span id="intensityMin">0.1</span>
            <input type="range" min="0.1" max="1.0" step="0.1" defaultValue="0.1" name="intensity" id="intensitySlider" onChange={this.updateIntensitySlider} />
            <span id="intensityMax">1</span>
            <br />

            <span>Main Color: </span>
            <input type="color" name="main_color" id="mainColorPicker" defaultValue="#008000" />

            <span>Background Color: </span>
            <input type="color" name="background_color" id="backgroundColorPicker" defaultValue="#ffffff" />

            <span>Shape: </span>
            <select name="shape" id="shape">
              <option value="square" className="shape">Square</option>
              <option value="round" className="shape">Round</option>
            </select>
            <br />

            <span>Set as Default: </span>
            <input type="checkbox" value="true" id="defaultcheckbox" />
            <br />

            <input type="text" name="title" placeholder="Title" id="titleInput" />

            <input type="button" id="saveSettings" value="Save" onClick={this.saveSettings} />
            <input type="button" id="loadDefaultSettings" value="Load Default" onClick={this.props.loadDefaultSettings} />
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