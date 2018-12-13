import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import Navbar from "./Navbar";
import Drawingboard from "./Drawingboard";
import Footer from "./Footer";
import Gallery from "./Gallery";
import './App.css';

class App extends Component {
  constructor (props) {
    super(props)
    
    this.state = {
      content: "Drawingboard",
      gridHeight: 700,

      gridSize: 20,
      intensity: "0.1",
      mainColor: "#008000",
      backgroundColor: "#ffffff",
      shape: "square",
      
      opacity: [],
      color: [],

      mouseHold: false,
      token: ""
    }

    this.mousedown = this.mousedown.bind(this);
    this.mouseup = this.mouseup.bind(this);

    this.createGrid = this.createGrid.bind(this);
    this.updateGrid = this.updateGrid.bind(this);

    //this.sendSave = this.sendSave.bind(this);

    this.save = this.save.bind(this);
    this.delete = this.delete.bind(this);
    this.reset = this.reset.bind(this);
    this.setDefaultSettings = this.setDefaultSettings.bind(this);
    this.setCurrentSettings = this.setCurrentSettings.bind(this);
    this.loadDefaultSettings = this.loadDefaultSettings.bind(this);

    this.login = this.login.bind(this);
    this.register = this.register.bind(this);
    this.account = this.account.bind(this);
  }

  mousedown(e) {
    e.preventDefault();

    this.setState({
      mouseHold: true
    })
  }

  mouseup(e) {
    e.preventDefault();

    this.setState({
      mouseHold: false
    })
  }

  updateGrid() {
    const gridItems = document.querySelectorAll(".gridItem");
    const drawingBoard = document.getElementById("drawingBoard");

    drawingBoard.style.background = this.state.backgroundColor;

    gridItems.forEach(e => {
      if (this.state.shape === "round") e.style.borderRadius = "50%";
      else e.style.borderRadius = "0";
    })
  }

  createGrid() {
    const gridItemDimension = this.state.gridHeight/this.state.gridSize + "px";
    let newOpacity = [];
    let newColor = [];

    document.getElementById("drawingBoard").innerHTML = "";
    document.getElementById("drawingBoard").style.backgroundColor = this.state.backgroundColor;

    for (let i = 0; i < (this.state.gridSize * this.state.gridSize); i++) {
      const gridItem = document.createElement("div");

      gridItem.style.width = gridItemDimension;
      gridItem.style.height = gridItemDimension;
      gridItem.style.boxSizing = "border-box"
      gridItem.style.border = "2px solid white";
      gridItem.style.float = "left";
      //gridItem.style.backgroundColor = this.state.mainColor;
      gridItem.style.opacity = 0;
      gridItem.className = "gridItem";

      if (this.state.shape === "round") gridItem.style.borderRadius = "50%";
      else gridItem.style.borderRadius = "0";
      
      document.getElementById("drawingBoard").appendChild(gridItem);
      
      newOpacity[i] = 0;
      newColor[i] = this.state.mainColor;

      this.setState({
        opacity: newOpacity,
        color: newColor
      })

      let self = this;

      gridItem.addEventListener("mouseover", function() {
        if (self.state.mouseHold) {
          this.style.backgroundColor = self.state.mainColor;

          let newOpacity = self.state.opacity.slice();
          let newColor = self.state.color.slice();

          newOpacity[i] += Number(self.state.intensity);
          newColor[i] = self.state.mainColor;

          self.setState({
            opacity: newOpacity,
            color: newColor
          })

          if (this.style.opacity < 1) this.style.opacity = self.state.opacity[i];
        }
      })
    }
  }

  save(e) {
    e.preventDefault();

    let gridItems = document.querySelectorAll(".gridItem");
    let opacity = [];
    let color = [];
    
    gridItems.forEach(e => {
      opacity.push(e.style.opacity);
      color.push(e.style.backgroundColor);
    })

    this.setState({
      opacity: opacity,
      color: color
    })
    //}, this.sendSave)
  }

  /*sendSave() {
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
  }*/

  reset() {
    this.setState({
      gridSize: 20,
      intensity: "0.1",
      mainColor: "#008000",
      backgroundColor: "#ffffff",
      shape: "square",
      
      opacity: [],
      color: []
    })
  }

  delete() {
    
  }

  getSettings() {
    fetch("/api/settings")
    .then(response => response.text())
    .then(data => {
      console.log(data);
    })
  }

  setDefaultSettings() {
    const settingsForm = document.getElementById("settingsForm");

    fetch("/api/settings", {
      method: "post",
      body: new URLSearchParams(new FormData(settingsForm)),
      headers: {
        'Accept': 'application/json',
        'Authorization': "Bearer " + this.state.token
      }
    })
    .then(response => response.json())
    .then(data => {
      console.log(data);
    })
  }

  setCurrentSettings() {
    const gridSize = document.getElementById("gridSizeSlider").value;
    const intensity = document.getElementById("intensitySlider").value;
    const mainColor = document.getElementById("mainColorPicker").value;
    const backgroundColor = document.getElementById("backgroundColorPicker").value;
    const shape = document.getElementById("shape").value;

    this.setState({
      gridSize: gridSize,
      intensity: intensity,
      mainColor: mainColor,
      backgroundColor: backgroundColor,
      shape: shape,
    }, this.updateGrid())
  }

  loadDefaultSettings() {
    fetch("/api/settings", {
      method: "get",
      headers: {
        'Accept': 'application/json',
        'Authorization': "Bearer " + this.state.token
      }
    })
    .then(response => response.json())
    .then(data => {
      console.log(data);

      this.setState({
        gridSize: data.default_grid_size,
        intensity: data.default_intensity,
        mainColor: data.default_main_color,
        backgroundColor: data.default_background_color,
        shape: data.default_shape
      })
    })
  }

  login() {
    console.log("login function")
    const loginForm = document.getElementById("loginForm");
    const submitLogin = document.getElementById("submitLogin");

    submitLogin.value = "Loading"

    fetch("/api/login", {
      method: "post",
      body: new URLSearchParams(new FormData(loginForm))
    })
    .then(response => response.json())
    .then(data => {
      submitLogin.value = "Success"

      console.log(data);

      this.setState({
        gridSize: data.default_grid_size,
        intensity: data.default_intensity,
        mainColor: data.default_main_color,
        backgroundColor: data.default_background_color,
        shape: data.default_shape,
        token: data.success.token
      })
    })
    .then(() => {
      console.log(this.state)
    })
  }

  register() {
    const registerForm = document.getElementById("registerForm");
    const submitRegister = document.getElementById("submitRegister");

    submitRegister.value = "Loading"

    fetch("/api/register", {
      method: "post",
      body: new URLSearchParams(new FormData(registerForm))
    })
    .then(response => response.text())
    .then(data => {
      console.log(data);

      submitRegister.value = "Success"
    })
  }

  account() {
    fetch("/api/account", {
      method: "post",
      headers: {
          'Accept': 'application/json',
          'Authorization': "Bearer " + this.state.token
      }
    })
    .then(response => response.json())
    .then(data => {
      console.log(data);
    })
  }

  componentDidMount() {
    document.getElementById("galleryButton").addEventListener("click", e => {
      e.preventDefault();

      if (this.state.content === "Drawingboard") {
        this.setState({
          content: "Gallery"
        })
      } else {
        this.setState({
          content: "Drawingboard"
        })
      }
    })
  }

  render() {
    let content = null;

    if (this.state.content === "Drawingboard") {
      content = (
        <Drawingboard
          mouseup={this.mouseup}
          mousedown={this.mousedown}
          createGrid={this.createGrid}
          updateGrid={this.updateGrid}

          gridSize={this.state.gridSize}
          gridHeight={this.state.gridHeight}
          mouseHold={this.state.mouseHold}
          opacity={this.state.opacity}
          shape={this.state.shape}
        />
      )
    } else {
      content = (
        <Gallery />
      )
    }

    return (
      <div className="App">
        <Navbar 
          home={this.state.content}
          opacity={this.state.opacity}

          updateGrid={this.updateGrid}
          createGrid={this.createGrid}
          save={this.save}
          delete={this.delete}
          reset={this.reset}
          setCurrentSettings={this.setCurrentSettings}
          setDefaultSettings={this.setDefaultSettings}
          loadDefaultSettings={this.loadDefaultSettings}
          login={this.login}
          register={this.register}
          account={this.account}
        />

        {content}

        <Footer />
      </div>
    );
  }
}

ReactDOM.render(<App />, document.getElementById('app'));