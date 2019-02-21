import React, { Component } from 'react';
import Settings from "./Settings";

class Navbar extends Component {
  constructor (props) {
    super(props)

    this.createAccountModal = this.createAccountModal.bind(this);
    this.showSettings = this.showSettings.bind(this);
    this.showMenu = this.showMenu.bind(this);
    this.hideMenu = this.hideMenu.bind(this);
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

    document.querySelectorAll(".close").forEach(e => {
      e.addEventListener("click", () => {
        this.hideMenu();
      })
    })
  }

  showSettings() {
    const settingsForm = document.getElementById("settingsForm");
    const navbar = document.getElementById("navbar");
    const settingsButton = document.getElementById("settingsButton");
      
    if (settingsForm.style.display == "none") {
      settingsForm.style.display = "flex";
      navbar.style.height = "100%";
      settingsButton.innerHTML = '<i class="fas fa-angle-double-up"></i> Settings'
    } else {
      settingsForm.style.display = "none";
      navbar.style.height = "83px";
      settingsButton.innerHTML = '<i class="fas fa-angle-double-down"></i> Settings'
    }

    const navbarSettings = document.getElementById("navbarSettings");

    window.onclick = e => {
      if (e.target === navbarSettings) {
        settingsForm.style.display = "none";
        navbar.style.height = "83px";
        settingsButton.innerHTML = '<i class="fas fa-angle-double-down"></i> Settings'
      }
    }
  }

  createAccountModal() {
    const accountModal = document.getElementById("accountModal");
    const closeModal = document.getElementById("closeModal");

    accountModal.style.display = "flex";

    closeModal.onclick = () => {
      accountModal.style.display = "none";
    }

    window.onclick = e => {
      if (e.target === accountModal) {
        accountModal.style.display = "none";
      }
    }
  }

  showMenu() {
    const navbarButtons = document.querySelector(".navbarButtons");
    const menu = document.querySelector(".menu");

    navbarButtons.classList.toggle("show-buttons");
    menu.classList.toggle("align-burger")
  }

  hideMenu() {
    const navbarButtons = document.querySelector(".navbarButtons");
    const menu = document.querySelector(".menu");

    navbarButtons.classList.remove("show-buttons");
    menu.classList.remove("align-burger")
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
            <button className="close" id="save" onClick={this.props.save}>Save</button>
            <button className="close" id="delete" onClick={() => this.props.delete(this.props.drawingId)}>Delete</button>
            <button className="close" id="clear" onClick={this.props.clear}>Clear</button>
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
        <div className="menu">

          <div className="navbarButtons">
            <div id="gallery">
              <button className="close" id="galleryButton">{home}</button>
            </div>

            {buttons}
            
            <div id="account">
              <button className="close" id="openAccountModal" onClick={this.createAccountModal}>Account</button>
            </div>
          </div>

          <div id="burger">
            <i className="fas fa-bars" onClick={this.showMenu} />
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