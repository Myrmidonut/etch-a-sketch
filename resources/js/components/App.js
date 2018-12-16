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
      gridHeight: 600,

      gridSize: 20,
      intensity: "0.1",
      mainColor: "#008000",
      backgroundColor: "#ffffff",
      shape: "square",
      title: "",
      drawingId: null,
      
      opacity: [],
      color: [],

      mouseHold: false,

      accountName: "",
      accountId: "",
      token: ""
    }

    this.mousedown = this.mousedown.bind(this);
    this.mouseup = this.mouseup.bind(this);

    this.createGrid = this.createGrid.bind(this);
    this.updateGrid = this.updateGrid.bind(this);

    this.loadAllDrawings = this.loadAllDrawings.bind(this);
    this.loadOneDrawing = this.loadOneDrawing.bind(this);
    this.loadPersonalDrawings = this.loadPersonalDrawings.bind(this);

    this.openDrawing = this.openDrawing.bind(this);
    this.saveDrawing = this.saveDrawing.bind(this);
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
    console.log("update grid")

    const gridItems = document.querySelectorAll(".gridItem");
    const drawingBoard = document.getElementById("drawingBoard");

    document.getElementById("gridSizeValue").textContent = this.state.gridSize;
    document.getElementById("gridSizeSlider").value = this.state.gridSize;
    document.getElementById("shape").value = this.state.shape;
    document.getElementById("backgroundColorPicker").value = this.state.backgroundColor;

    drawingBoard.style.background = this.state.backgroundColor;

    gridItems.forEach((e, i) => {
      if (this.state.shape === "round") e.style.borderRadius = "50%";
      else e.style.borderRadius = "0";

      e.style.opacity = this.state.opacity[i];
      e.style.backgroundColor = this.state.color[i];
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
      gridItem.style.backgroundColor = "#008000";

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

  loadAllDrawings() {
    fetch("/api/drawings")
    .then(response => response.json())
    .then(data => {
      console.log(data)
      return data;
    })
  }

  loadOneDrawing(id) {
    fetch(`/api/drawings/${id}`)
    .then(response => response.json())
    .then(data => {
      console.log(data)
      //return data;
    })
  }

  loadPersonalDrawings(id) {
    fetch(`/api/drawings/personal/${id}`)
    .then(response => response.json())
    .then(data => {
      //console.log(data)
      
      document.getElementById("galleryPersonal").textContent = "";

      const heading = document.createElement("h2");
      heading.textContent = "Personal Drawings:"
      document.getElementById("galleryPersonal").appendChild(heading);

      const galleryPersonalContainer = document.createElement("div");
      galleryPersonalContainer.id = "galleryPersonalContainer";
      document.getElementById("galleryPersonal").appendChild(galleryPersonalContainer);

      //data[1].forEach((e, i) => {
      data.forEach((e, i) => {
        const drawing = document.createElement("div");
        drawing.id = "previewPersonal" + i;
        drawing.className = "previewPersonal";

        document.getElementById("galleryPersonalContainer").appendChild(drawing);

        const gridHeight = 120;
        const gridItemDimension = gridHeight/e.grid_size + "px";
    
        document.getElementById("previewPersonal" + i).style.backgroundColor = e.background_color;
        document.getElementById("previewPersonal" + i).style.height = gridHeight + "px";
        document.getElementById("previewPersonal" + i).style.width = gridHeight + "px";
        document.getElementById("previewPersonal" + i).style.border = "2px solid green";

        document.getElementById("previewPersonal" + i).addEventListener("click", f => {
          f.preventDefault();
          console.log("clicked " + e.id)

          this.openDrawing(e);
        })

        for (let j = 0; j < (e.grid_size * e.grid_size); j++) {
          const gridItem = document.createElement("div");
    
          gridItem.style.width = gridItemDimension;
          gridItem.style.height = gridItemDimension;
          gridItem.style.boxSizing = "border-box"
          gridItem.style.border = "2px solid white";
          gridItem.style.float = "left";
          gridItem.style.backgroundColor = JSON.parse(e.color).split(",")[j];
          gridItem.style.opacity = JSON.parse(e.opacity).split(",")[j];
          gridItem.className = "gridItem";

          if (e.shape === "round") gridItem.style.borderRadius = "50%";
          else gridItem.style.borderRadius = "0";
          
          document.getElementById("previewPersonal" + i).appendChild(gridItem);
        }
      })










    })
  }

  saveDrawing() {
    document.getElementById("save").textContent = "Saving";

    fetch("/api/save", {
      method: "post",
      body: new URLSearchParams({
        grid_size: this.state.gridSize,
        opacity: this.state.opacity,
        color: this.state.color,
        background_color: this.state.backgroundColor,
        shape: this.state.shape,
        owner: this.state.accountId,
        title: this.state.title
      }),
      headers: {
        'Accept': 'application/json',
        'Authorization': "Bearer " + this.state.token
      }
    })
    .then(response => response.text())
    .then(data => {
      console.log("drawing saved")
      console.log(data);

      document.getElementById("save").textContent = "Save";
    })
  }

  reset() {
    this.setState({
      gridSize: 20,
      intensity: "0.1",
      mainColor: "#008000",
      backgroundColor: "#ffffff",
      shape: "square",
      
      opacity: new Array(400).fill(0),
      color: new Array(400).fill("#008000")
    }, this.updateGrid)
  }

  delete(id) {
    document.getElementById("delete").textContent = "Deleting";

    console.log("deleting");

    fetch(`/api/delete/${id}`, {
      method: "post",
      body: new URLSearchParams({
        owner: this.state.accountId
      }),
      headers: {
        'Accept': 'application/json',
        'Authorization': "Bearer " + this.state.token
      }
    })
    .then(response => response.text())
    .then(data => {
      console.log("drawing deleted")
      console.log(data);

      document.getElementById("delete").textContent = "Delete";
    })
  }

  setDefaultSettings() {
    const settingsForm = document.getElementById("settingsForm");
    const saveButton = document.getElementById("saveSettings");

    saveButton.value = "Saving";

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
      saveButton.value = "Save";

      console.log("default settings loaded")
    })
  }

  setCurrentSettings() {
    const gridSize = Number(document.getElementById("gridSizeSlider").value);
    const intensity = document.getElementById("intensitySlider").value;
    const mainColor = document.getElementById("mainColorPicker").value;
    const backgroundColor = document.getElementById("backgroundColorPicker").value;
    const shape = document.getElementById("shape").value;
    const title = document.getElementById("titleInput").value;

    this.setState({
      gridSize: gridSize,
      intensity: intensity,
      mainColor: mainColor,
      backgroundColor: backgroundColor,
      shape: shape,
      title: title
    }, this.updateGrid)

    console.log("set current settings")
  }

  loadDefaultSettings() {
    const loadDefaultButton = document.getElementById("loadDefaultSettings");

    loadDefaultButton.value = "Loading";

    fetch("/api/settings", {
      method: "get",
      headers: {
        'Accept': 'application/json',
        'Authorization': "Bearer " + this.state.token
      }
    })
    .then(response => response.json())
    .then(data => {
      loadDefaultButton.value = "Save";

      this.setState({
        gridSize: data.default_grid_size,
        intensity: data.default_intensity,
        mainColor: data.default_main_color,
        backgroundColor: data.default_background_color,
        shape: data.default_shape
      })
    })
    .then(() => {
      document.getElementById("gridSizeSlider").value = this.state.gridSize;
      document.getElementById("intensitySlider").value = this.state.intensity;
      document.getElementById("mainColorPicker").value = this.state.mainColor;
      document.getElementById("backgroundColorPicker").value = this.state.backgroundColor;
      document.getElementById("shape").value = this.state.shape;

      console.log("Defaults loaded")
    })
  }

  login() {
    const loginForm = document.getElementById("loginForm");
    const submitLogin = document.getElementById("submitLogin");

    submitLogin.value = "Loading"

    fetch("/api/login", {
      method: "post",
      body: new URLSearchParams(new FormData(loginForm))
    })
    .then(response => response.json())
    .then(data => {
      submitLogin.value = "Login"

      this.setState({
        gridSize: data.default_grid_size,
        intensity: data.default_intensity,
        mainColor: data.default_main_color,
        backgroundColor: data.default_background_color,
        shape: data.default_shape,
        accountName: data.name,
        accountId: data.id,
        token: data.success.token
      })
    })
    .then(() => {
      document.getElementById("gridSizeSlider").value = this.state.gridSize;
      document.getElementById("gridSizeValue").textContent = this.state.gridSize;
      document.getElementById("intensitySlider").value = this.state.intensity;
      document.getElementById("intensityValue").textContent = this.state.intensity;
      document.getElementById("mainColorPicker").value = this.state.mainColor;
      document.getElementById("backgroundColorPicker").value = this.state.backgroundColor;
      document.getElementById("shape").value = this.state.shape;
      document.getElementById("accountLink").textContent = this.state.accountName;

      console.log("Logged in")
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
      console.log("Registered");

      submitRegister.value = "Register"
    })
  }

  account() {
    fetch("/api/account", {
      method: "get",
      headers: {
          'Accept': 'application/json',
          'Authorization': "Bearer " + this.state.token
      }
    })
    .then(response => response.json())
    .then(data => {
      console.log(data)
      console.log("Account");
    })
  }

  openDrawing(e) {
    console.log(e);

    this.setState({
      content: "Drawingboard"
    })

    this.setState({
      gridSize: e.grid_size
    })

    this.setState({
      backgroundColor: e.background_color,
      opacity: JSON.parse(e.opacity).split(","),
      color: JSON.parse(e.color).split(","),
      shape: e.shape,
      drawingId: e.id
    })

    const newOpacity = this.state.opacity.slice().map(e => Number(e))
    
    this.setState({
      opacity: newOpacity
    }, this.updateGrid)
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

    if (this.state.content === "Gallery") {
      content = (
        <Gallery
          home={this.state.content}
          accountId={this.state.accountId}

          loadAllDrawings={this.loadAllDrawings}
          loadOneDrawing={this.loadOneDrawing}
          loadPersonalDrawings={this.loadPersonalDrawings}
          openDrawing={this.openDrawing}
        />
      )
    }

    return (
      <div className="App">
        <Navbar 
          home={this.state.content}
          opacity={this.state.opacity}
          drawingId={this.state.drawingId}

          updateGrid={this.updateGrid}
          createGrid={this.createGrid}

          save={this.saveDrawing}
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

        <Footer />

        <div id="myModal" className="modal">
          <div className="modal-content">
            <span className="close">&times;</span>

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

              <br />

              <a href="/" alt="Logout">Logout</a>

              <br />

              <a href="/api/account" alt="Account" id="accountLink">Account</a>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

ReactDOM.render(<App />, document.getElementById('app'));