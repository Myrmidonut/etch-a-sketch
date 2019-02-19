import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import Navbar from "./Navbar";
import Drawingboard from "./Drawingboard";
import Footer from "./Footer";
import Gallery from "./Gallery";
import Modal from "./Modal";
//import './App.css';

class App extends Component {
  constructor (props) {
    super(props)
    
    this.state = {
      content: "Drawingboard",
      gridHeight: 600,

      galleryLatest: undefined,
      galleryPersonal: undefined,
      galleryLatestBlock: 5,
      galleryPersonalBlock: 5,

      gridSize: 50,
      intensity: "0.2",
      mainColor: "#FF0033",
      backgroundColor: "#ffffff",
      shape: "square",
      title: "",
      drawingId: null,
      
      opacity: [],
      color: [],

      mouseHold: false,
      mouseHoldRight: false,

      accountName: "",
      accountId: "",
      token: ""
    }

    this.mousedown = this.mousedown.bind(this);
    this.mouseup = this.mouseup.bind(this);

    this.createGrid = this.createGrid.bind(this);
    this.updateGrid = this.updateGrid.bind(this);

    this.showLatestDrawings = this.showLatestDrawings.bind(this);
    this.loadLatestDrawings = this.loadLatestDrawings.bind(this);
    this.galleryLatestBlockIncrease = this.galleryLatestBlockIncrease.bind(this);
    this.galleryLatestBlockDecrease = this.galleryLatestBlockDecrease.bind(this);

    this.showPersonalDrawings = this.showPersonalDrawings.bind(this);
    this.loadPersonalDrawings = this.loadPersonalDrawings.bind(this);
    this.galleryPersonalBlockIncrease = this.galleryPersonalBlockIncrease.bind(this);
    this.galleryPersonalBlockDecrease = this.galleryPersonalBlockDecrease.bind(this);

    this.loadOneDrawing = this.loadOneDrawing.bind(this);
    
    this.openDrawing = this.openDrawing.bind(this);
    this.saveDrawing = this.saveDrawing.bind(this);
    this.delete = this.delete.bind(this);
    this.reset = this.reset.bind(this);
    this.clear = this.clear.bind(this);
    this.setMainColor = this.setMainColor.bind(this);
    this.setBackgroundColor = this.setBackgroundColor.bind(this);

    this.saveDefaultSettings = this.saveDefaultSettings.bind(this);
    this.saveCurrentSettings = this.saveCurrentSettings.bind(this);
    this.loadDefaultSettings = this.loadDefaultSettings.bind(this);

    this.login = this.login.bind(this);
    this.register = this.register.bind(this);
    this.accountDetails = this.accountDetails.bind(this);
  }

  mousedown(e) {
    e.preventDefault();

    if (e.button === 2) {
      this.setState({
        mouseHoldRight: true
      })
    }

    this.setState({
      mouseHold: true
    })
  }

  mouseup(e) {
    e.preventDefault();

    if (e.button === 2) {
      this.setState({
        mouseHoldRight: false
      })
    }

    this.setState({
      mouseHold: false
    })
  }

  updateGrid() {
    const gridItems = document.querySelectorAll(".gridItem");
    const drawingBoard = document.getElementById("drawingBoard");

    document.getElementById("gridSizeValue").textContent = this.state.gridSize;
    document.getElementById("gridSizeSlider").value = this.state.gridSize;
    document.getElementById("shape").value = this.state.shape;
    document.getElementById("backgroundColorPicker").value = this.state.backgroundColor;

    drawingBoard.style.background = this.state.backgroundColor;

    gridItems.forEach((e, i) => {
      if (this.state.shape === "round") e.style.borderRadius = "50%";
      else if (this.state.shape === "squircle") e.style.borderRadius = "35%";
      else e.style.borderRadius = "0";

      e.style.opacity = this.state.opacity[i];
      e.style.backgroundColor = this.state.color[i];
      e.style.border = `1px solid ${this.state.backgroundColor}`
    })
  }

  createGrid() {
    document.getElementById("drawingBoard").addEventListener("contextmenu", e => e.preventDefault());

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
      gridItem.style.border = `1px solid ${this.state.backgroundColor}`;
      gridItem.style.float = "left";
      gridItem.style.backgroundColor = "#008000";
      gridItem.style.opacity = 0;
      gridItem.className = "gridItem";

      if (this.state.shape === "round") gridItem.style.borderRadius = "50%";
      else if (this.state.shape === "squircle") gridItem.style.borderRadius = "35%";
      else gridItem.style.borderRadius = "0";
      
      document.getElementById("drawingBoard").appendChild(gridItem);
      
      newOpacity[i] = 0;
      newColor[i] = this.state.mainColor;

      this.setState({
        opacity: newOpacity,
        color: newColor
      })

      let self = this;

      gridItem.addEventListener("mouseover", function(e) {
        if (self.state.mouseHoldRight) {
          let newOpacity = self.state.opacity.slice();

          newOpacity[i] = 0;

          self.setState({
            opacity: newOpacity
          })

          this.style.opacity = self.state.opacity[i];
        } else if (self.state.mouseHold) {
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

      gridItem.addEventListener("mousedown", function(e) {
        if (e.button === 2) {
          let newOpacity = self.state.opacity.slice();

          newOpacity[i] = 0;

          self.setState({
            opacity: newOpacity
          })

          this.style.opacity = self.state.opacity[i];
        } else {
          this.style.backgroundColor = self.state.mainColor;

          let newOpacity = self.state.opacity.slice();
          let newColor = self.state.color.slice();

          if (newOpacity[i] < 1) newOpacity[i] += Number(self.state.intensity);
          newColor[i] = self.state.mainColor;

          self.setState({
            opacity: newOpacity,
            color: newColor
          })
          
          this.style.opacity = self.state.opacity[i];
        }
      })
    }
  }

  galleryPersonalBlockIncrease() {
    let block = this.state.galleryPersonalBlock;
    const length = this.state.galleryPersonal.length;

    if (block <= length) {
      block += 5;

      this.setState({
        galleryPersonalBlock: block
      }, () => this.showPersonalDrawings(this.state.galleryPersonalBlock))
    }
  }

  galleryPersonalBlockDecrease() {
    let block = this.state.galleryPersonalBlock;

    if (block >= 10) {
      block -= 5;

      this.setState({
        galleryPersonalBlock: block
      }, () => this.showPersonalDrawings(this.state.galleryPersonalBlock))
    } else {
      this.setState({
        galleryPersonalBlock: 5
      }, () => this.showPersonalDrawings(this.state.galleryPersonalBlock))
    }
  }

  galleryLatestBlockIncrease() {
    let block = this.state.galleryLatestBlock;
    const length = this.state.galleryLatest.length;

    if (block <= length) {
      block += 5;

      this.setState({
        galleryLatestBlock: block
      }, () => this.showLatestDrawings(this.state.galleryLatestBlock))
    }
  }

  galleryLatestBlockDecrease() {
    let block = this.state.galleryLatestBlock;

    if (block >= 10) {
      block -= 5;

      this.setState({
        galleryLatestBlock: block
      }, () => this.showLatestDrawings(this.state.galleryLatestBlock))
    } else {
      this.setState({
        galleryLatestBlock: 5
      }, () => this.showLatestDrawings(this.state.galleryLatestBlock))
    }
  }

  showLatestDrawings(block) {
    document.getElementById("galleryLatestContainer").textContent = "";

    this.state.galleryLatest.forEach((e, i) => {
      let blockMin = 0;

      if (block > 5) blockMin = block - 5;

      if (i >= blockMin && i < block) {
        const drawing = document.createElement("div");

        drawing.id = "previewLatest" + i;
        drawing.className = "previewLatest";

        document.getElementById("galleryLatestContainer").appendChild(drawing);

        const gridHeight = 120;
        const gridItemDimension = gridHeight/e.grid_size + "px";
    
        document.getElementById("previewLatest" + i).style.backgroundColor = e.background_color;
        document.getElementById("previewLatest" + i).style.height = gridHeight + "px";
        document.getElementById("previewLatest" + i).style.width = gridHeight + "px";

        document.getElementById("previewLatest" + i).addEventListener("click", f => {
          f.preventDefault();

          this.openDrawing(e);
        })

        for (let j = 0; j < (e.grid_size * e.grid_size); j++) {
          const gridItem = document.createElement("div");
    
          gridItem.style.width = gridItemDimension;
          gridItem.style.height = gridItemDimension;
          gridItem.style.boxSizing = "border-box"
          gridItem.style.border = `1px solid ${e.background_color}`;
          gridItem.style.float = "left";
          gridItem.style.backgroundColor = JSON.parse(e.color).split(",")[j];
          gridItem.style.opacity = JSON.parse(e.opacity).split(",")[j];
          gridItem.className = "gridItem";

          if (e.shape === "round") gridItem.style.borderRadius = "50%";
          else gridItem.style.borderRadius = "0";
          
          document.getElementById("previewLatest" + i).appendChild(gridItem);
        }
      }
    })
  }

  loadLatestDrawings() {
    fetch("/api/drawings/latest")
    .then(response => response.json())
    .then(data => {
      this.setState({
        galleryLatest: data
      }, () => this.showLatestDrawings(this.state.galleryLatestBlock))
    })
  }

  showPersonalDrawings(block) {
    document.getElementById("galleryPersonalContainer").textContent = "";

    this.state.galleryPersonal.forEach((e, i) => {
      let blockMin = 0;

      if (block > 5) blockMin = block - 5;

      if (i >= blockMin && i < block) {
        const drawing = document.createElement("div");

        drawing.id = "previewPersonal" + i;
        drawing.className = "previewPersonal";

        document.getElementById("galleryPersonalContainer").appendChild(drawing);

        const gridHeight = 120;
        const gridItemDimension = gridHeight/e.grid_size + "px";
    
        document.getElementById("previewPersonal" + i).style.backgroundColor = e.background_color;
        document.getElementById("previewPersonal" + i).style.height = gridHeight + "px";
        document.getElementById("previewPersonal" + i).style.width = gridHeight + "px";

        document.getElementById("previewPersonal" + i).addEventListener("click", f => {
          f.preventDefault();

          this.openDrawing(e);
        })

        for (let j = 0; j < (e.grid_size * e.grid_size); j++) {
          const gridItem = document.createElement("div");
    
          gridItem.style.width = gridItemDimension;
          gridItem.style.height = gridItemDimension;
          gridItem.style.boxSizing = "border-box"
          gridItem.style.border = `1px solid ${e.background_color}`;
          gridItem.style.float = "left";
          gridItem.style.backgroundColor = JSON.parse(e.color).split(",")[j];
          gridItem.style.opacity = JSON.parse(e.opacity).split(",")[j];
          gridItem.className = "gridItem";

          if (e.shape === "round") gridItem.style.borderRadius = "50%";
          else gridItem.style.borderRadius = "0";
          
          document.getElementById("previewPersonal" + i).appendChild(gridItem);
        }
      }
    })
  }

  loadPersonalDrawings(id) {
    fetch(`/api/drawings/personal/${id}`)
    .then(response => response.json())
    .then(data => {
      this.setState({
        galleryPersonal: data
      }, () => this.showPersonalDrawings(this.state.galleryPersonalBlock))
    })
  }

  loadOneDrawing(id) {
    fetch(`/api/drawings/one/${id}`)
    .then(response => response.json())
    .then(data => {
      this.setState({
        gridSize: data.grid_size
      })
  
      this.setState({
        backgroundColor: data.background_color,
        opacity: JSON.parse(data.opacity).split(","),
        color: JSON.parse(data.color).split(","),
        shape: data.shape,
        drawingId: data.id,
        title: data.title
      })

      const newOpacity = this.state.opacity.slice().map(e => Number(e))
    
      this.setState({
        opacity: newOpacity
      }, this.updateGrid)
    })
  }

  saveDrawing() {
    if (this.state.accountName) {
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
          title: this.state.title === "" ? "no title" : this.state.title,
          id: this.state.drawingId
        }),
        headers: {
          'Accept': 'application/json',
          'Authorization': "Bearer " + this.state.token
        }
      })
      .then(response => response.json())
      .then(data => {
        if (data.message === "Unauthenticated.") {
          document.getElementById("save").textContent = "Login first";
          document.getElementById("save").style.background = "#ffc107";

          setTimeout(() => {
            document.getElementById("save").textContent = "Save";
            document.getElementById("save").style.background = "white";
          }, 3000)
        } else document.getElementById("save").textContent = "Save";
      })
    } else {
      document.getElementById("save").textContent = "Login first";
      document.getElementById("save").style.background = "#ffc107";

      setTimeout(() => {
        document.getElementById("save").textContent = "Save";
        document.getElementById("save").style.background = "white";
      }, 3000)
    }
  }

  reset() {
    this.setState({
      gridSize: 50,
      intensity: "0.2",
      mainColor: "#FF0033",
      backgroundColor: "#ffffff",
      shape: "square",
      
      opacity: new Array(400).fill(0),
      color: new Array(400).fill("#008000")
    }, this.updateGrid)
  }

  clear() {
    this.setState({
      opacity: new Array(this.state.gridSize * this.state.gridSize).fill(0),
      color: new Array(this.state.gridSize * this.state.gridSize).fill("#008000")
    }, this.updateGrid)
  }

  delete(id) {
    if (this.state.accountName) {
      document.getElementById("delete").textContent = "Deleting";

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
        document.getElementById("delete").textContent = "Delete";
      })
    } else {
      document.getElementById("delete").textContent = "Login first";
      document.getElementById("delete").style.background = "#ffc107";

      setTimeout(() => {
        document.getElementById("delete").textContent = "Delete";
        document.getElementById("delete").style.background = "white";
      }, 3000)
    }
  }

  saveDefaultSettings() {
    const saveDefaultSettings = document.getElementById("saveDefaultSettings");

    if (this.state.accountName) {
      const settingsForm = document.getElementById("settingsForm");

      saveDefaultSettings.value = "Saving";

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
        saveDefaultSettings.value = "Save Default";
      })
    } else {
      saveDefaultSettings.style.background = "#ffc107";
      saveDefaultSettings.value = "Login First"

      setTimeout(() => {
        saveDefaultSettings.style.background = "white";
        saveDefaultSettings.value = "Save Default"
      }, 3000)
    }
  }

  saveCurrentSettings() {
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
  }

  loadDefaultSettings() {
    const loadDefaultSettings = document.getElementById("loadDefaultSettings");

    if (this.state.accountName) {
      loadDefaultSettings.value = "Loading";

      fetch("/api/settings", {
        method: "get",
        headers: {
          'Accept': 'application/json',
          'Authorization': "Bearer " + this.state.token
        }
      })
      .then(response => response.json())
      .then(data => {
        loadDefaultSettings.value = "Save";

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
        document.getElementById("gridSizeValue").textContent = this.state.gridSize;
        document.getElementById("intensitySlider").value = this.state.intensity;
        document.getElementById("intensityValue").textContent = this.state.intensity;
        document.getElementById("mainColorPicker").value = this.state.mainColor;
        document.getElementById("backgroundColorPicker").value = this.state.backgroundColor;
        document.getElementById("shape").value = this.state.shape;
      })
    } else {
      loadDefaultSettings.style.background = "#ffc107";
      loadDefaultSettings.value = "Login First"

      setTimeout(() => {
        loadDefaultSettings.style.background = "white";
        loadDefaultSettings.value = "Load Default"
      }, 3000)
    }
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
      submitLogin.value = "Login";

      document.getElementById("error").innerHTML = "";

      if (data.success) {
        this.setState({
          accountName: data.name,
          accountId: data.id,
          token: data.success.token
        })

        document.getElementById("accountModal").style.display = "none";
      } else {
        document.getElementById("error").innerHTML = `<span className="errorMessage">${data.error}</span>`;
      }
      
    })
    .then(() => {
      
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
    .then(response => response.json())
    .then(data => {
      document.getElementById("error").innerHTML = "";

      if ("error" in data) {
        const errors = Object.values(data.error)

        errors.forEach(e => {
          document.getElementById("error").innerHTML += `<span className='errorMessage'>${e[0]}</span><br>`;
        })
      }

      submitRegister.value = "Register"
    })
  }

  accountDetails() {
    if (this.state.accountName) {
      fetch("/api/account", {
        method: "get",
        headers: {
            'Accept': 'application/json',
            'Authorization': "Bearer " + this.state.token
        }
      })
      .then(response => response.json())
      .then(data => {
      })
    }
  }

  openDrawing(e) {
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
      drawingId: e.id,
      title: e.title
    })

    const newOpacity = this.state.opacity.slice().map(e => Number(e))
    
    this.setState({
      opacity: newOpacity
    }, this.updateGrid)
  }

  setMainColor(e) {
    e.preventDefault();

    document.querySelectorAll(".mainColor").forEach(f => {
      f.style.border = "2px solid #03A9F4";
    })

    e.target.style.border = "2px solid white";
    document.getElementById("mainColorPicker").value = e.target.value;

    this.setState({
      mainColor: e.target.value
    })
  }

  setBackgroundColor(e) {
    e.preventDefault();

    document.querySelectorAll(".backgroundColor").forEach(f => {
      f.style.border = "2px solid #03A9F4";
    })

    e.target.style.border = "2px solid white";

    this.setState({
      backgroundColor: e.target.value
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

          loadLatestDrawings={this.loadLatestDrawings}
          galleryLatestBlockIncrease={this.galleryLatestBlockIncrease}
          galleryLatestBlockDecrease={this.galleryLatestBlockDecrease}

          loadPersonalDrawings={this.loadPersonalDrawings}
          galleryPersonalBlockIncrease={this.galleryPersonalBlockIncrease}
          galleryPersonalBlockDecrease={this.galleryPersonalBlockDecrease}
        />
      )
    }

    return (
      <div className="App">
        <Navbar 
          home={this.state.content}
          opacity={this.state.opacity}
          drawingId={this.state.drawingId}
          title={this.state.title}
          gridSize={this.state.gridSize}

          updateGrid={this.updateGrid}
          createGrid={this.createGrid}

          save={this.saveDrawing}
          delete={this.delete}
          reset={this.reset}
          clear={this.clear}
          setMainColor={this.setMainColor}
          setBackgroundColor={this.setBackgroundColor}

          saveCurrentSettings={this.saveCurrentSettings}
          saveDefaultSettings={this.saveDefaultSettings}
          loadDefaultSettings={this.loadDefaultSettings}

          login={this.login}
          register={this.register}
          account={this.account}
        />

        <div id="main">
          {content}

          <Drawingboard
            gridSize={this.state.gridSize}
            gridHeight={this.state.gridHeight}
            mouseHold={this.state.mouseHold}
            opacity={this.state.opacity}
            shape={this.state.shape}

            mouseup={this.mouseup}
            mousedown={this.mousedown}
            createGrid={this.createGrid}
            updateGrid={this.updateGrid}
            loadOneDrawing={this.loadOneDrawing}
          />

          <Modal 
            accountDetails={this.accountDetails}
          />
        </div>

        <Footer />
      </div>
    );
  }
}

ReactDOM.render(<App />, document.getElementById('app'));