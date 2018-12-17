import React, { Component } from 'react';

class Navbar extends Component {
  constructor (props) {
    super(props)

    this.updateGridSizeSlider = this.updateGridSizeSlider.bind(this);
    this.updateIntensitySlider = this.updateIntensitySlider.bind(this);
    this.createAccountModal = this.createAccountModal.bind(this);
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

    document.getElementById("gridSizeSlider").addEventListener("mouseup", (e) => {
      e.preventDefault();
      this.props.saveCurrentSettings();
      this.props.clear();
    })

    document.getElementById("intensitySlider").addEventListener("mouseup", (e) => {
      e.preventDefault();
      this.props.saveCurrentSettings();
    })
  }

  updateGridSizeSlider() {
    document.getElementById("gridSizeValue").textContent = document.getElementById("gridSizeSlider").value;
  }

  updateIntensitySlider() {
    document.getElementById("intensityValue").textContent = document.getElementById("intensitySlider").value;
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
            <input type="color" name="main_color" id="mainColorPicker" defaultValue="#008000" onChange={this.props.saveCurrentSettings} />

            <span>Background Color: </span>
            <input type="color" name="background_color" id="backgroundColorPicker" defaultValue="#ffffff" onChange={this.props.saveCurrentSettings} />

            <span>Shape: </span>
            <select name="shape" id="shape" onChange={this.props.saveCurrentSettings} >
              <option value="square" className="shape">Square</option>
              <option value="round" className="shape">Round</option>
            </select>
            <br />

            <input type="text" name="title" placeholder="Title" id="titleInput" required onChange={this.props.saveCurrentSettings} />

            <input type="button" id="saveDefaultSettings" value="Save Default" onClick={this.props.saveDefaultSettings} />
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
          {/*<a href="/" alt="My Drawings">My Drawings</a>*/}
          {/*<a href="/" alt="Popular">Popular</a>*/}
          {/*<a href="/" alt="Recent">Recent</a>*/}
        </div>
      )
    }

    return (
      <div id="navbar">
        <div id="gallery">
          <button id="galleryButton">{home}</button>
        </div>

        {buttons}
        
        <div id="account">
          <button id="openAccountModal" onClick={this.createAccountModal}>Account</button>
        </div>
      </div>
    )
  }
}

export default Navbar;