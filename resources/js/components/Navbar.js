import React, { Component } from 'react';

class Navbar extends Component {
  constructor (props) {
    super(props)
  }

  componentDidMount() {
    document.getElementById("save").addEventListener("click", this.save);

    document.getElementById("registerForm").addEventListener("submit", e => {
      e.preventDefault();

      console.log("register form")

      this.props.register();
    });

    document.getElementById("loginForm").addEventListener("submit", e => {
      e.preventDefault();

      console.log("login form")

      this.props.login();
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
          <a href="/" alt="Save" id="save"
            onClick={this.props.save}>Save</a>
          <a href="/" alt="Delete">Delete</a>
          <a href="/" alt="Reset">Reset</a>
          <a href="/" alt="Settings" id="settings"
            onClick={this.props.settings}>Settings</a>
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
            <input name="name"></input>
            <input type="email" name="email"></input>
            <input tyoe="password" name="password"></input>
            <input type="password" name="c_password"></input>
            <input type="submit"></input>
          </form>

          <form id="loginForm">
            <input type="email" name="email"></input>
            <input tyoe="password" name="password"></input>
            <input type="submit"></input>
          </form>

          <a href="/" alt="Logout">Logout</a>
          <a href="/api/getDetails" alt="Account" id="getDetails">Account</a>
        </div>
      </div>
    )
  }
}

export default Navbar;