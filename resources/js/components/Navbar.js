import React, { Component } from 'react';

class Navbar extends Component {
  constructor (props) {
    super(props)

    this.save = this.save.bind(this);
  }

  componentDidMount() {
    document.getElementById("save").addEventListener("click", this.save)
  }

  save(e) {
    e.preventDefault();

    let a = document.querySelectorAll(".gridItem");
    let b = [];
    
    a.forEach(e => {
      b.push(e.style.opacity);
    })

    this.setState({
      opacity: b
    })
    
    fetch("/api/save", {
      method: "post",
      body: new URLSearchParams({
        data: this.state.opacity
      })
    })
    .then(response => response.text())
    .then(data => {
      console.log(data);
    })
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
          <a href="/" alt="Delete">Delete</a>
          <a href="/" alt="Reset">Reset</a>
          <a href="/" alt="Settings">Settings</a>
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
          <a href="/api/login" alt="Login" id="login">Login</a>
          <a href="/" alt="Register">Register</a>
          <a href="/" alt="Logout">Logout</a>
          <a href="/" alt="Account">Account</a>
        </div>
      </div>
    )
  }
}

export default Navbar;