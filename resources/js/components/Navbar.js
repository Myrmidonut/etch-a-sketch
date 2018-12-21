import React, { Component } from 'react';
import Settings from "./Settings";

class Navbar extends Component {
  constructor (props) {
    super(props)

    this.createAccountModal = this.createAccountModal.bind(this);
    this.showSettings = this.showSettings.bind(this);
  }

  componentDidMount() {
    document.getElementById("registerForm").addEventListener("submit", e => {
      e.preventDefault();
      this.props.register();
    });

    document.getElementById("loginForm").addEventListener("submit", e => {
      e.preventDefault();
      this.props.login();
    });

    document.getElementById("settingsForm").style.display = "none";
  }

  showSettings() {
    const settingsForm = document.getElementById("settingsForm");
    const navbar = document.getElementById("navbar");
      
    if (settingsForm.style.display == "none") {
      settingsForm.style.display = "flex";
      navbar.style.height = "100%";
    } else {
      settingsForm.style.display = "none";
      navbar.style.height = "83px";
    }

    const navbarSettings = document.getElementById("navbarSettings");

    window.onclick = e => {
      if (e.target === navbarSettings) {
        settingsForm.style.display = "none";
        navbar.style.height = "83px";
      }
    }
  }

  createAccountModal() {
    const accountModal = document.getElementById("accountModal");
    const closeModal = document.getElementById("closeModal");

    accountModal.style.display = "block";

    closeModal.onclick = () => {
      accountModal.style.display = "none";
    }

    window.onclick = e => {
      if (e.target === accountModal) {
        accountModal.style.display = "none";
      }
    }
  }

  render() {
    let buttons = null;
    let home = null;
    let settings = null;

    if (this.props.home === "Drawingboard") {
      home = (
        "Gallery"
      )

      buttons = (
        <div id="interface">
          <div id="buttonsDrawing">
            <button id="save" onClick={this.props.save}>Save</button>
            <button id="delete" onClick={() => this.props.delete(this.props.drawingId)}>Delete</button>
            <button id="clear" onClick={this.props.clear}>Clear</button>
          </div>
        </div>
      )

      settings = (
        <Settings 
          saveDefaultSettings={this.props.saveDefaultSettings}
          loadDefaultSettings={this.props.loadDefaultSettings}
          showSettings={this.showSettings}
          saveCurrentSettings={this.props.saveCurrentSettings}
          clear={this.props.clear}
          gridSize={this.props.gridSize}
          setMainColor={this.props.setMainColor}
          setBackgroundColor={this.props.setBackgroundColor}
        />
      )
    } else if (this.props.home === "Gallery") {
      home = (
        "Drawingboard"
      )

      buttons = (
        <div id="interface" />
      )

      settings = (
        <div />
      )
    }

    return (
      <div id="navbar">
        <div id="navbarButtons">

          <div id="gallery">
            <button id="galleryButton">{home}</button>
          </div>

          {buttons}
          
          <div id="account">
            <button id="openAccountModal" onClick={this.createAccountModal}>Account</button>
          </div>

        </div>

        <div id="navbarSettings">
          {settings}
        </div>
      </div>
    )
  }
}

export default Navbar;