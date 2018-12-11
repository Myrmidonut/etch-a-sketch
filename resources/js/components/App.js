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
      gridSize: 3,
      gridHeight: 700,
      opacity: [],
      mouseHold: false
    }

    this.login = this.login.bind(this);
    this.register = this.register.bind(this);
    this.sendSave = this.sendSave.bind(this);
    this.save = this.save.bind(this);
    this.settings = this.settings.bind(this);
  }

  settings(e) {
    e.preventDefault();

    this.setState({
      gridSize: 10
    })
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
    }, this.sendSave)
  }

  sendSave() {
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

  login() {
    const loginForm = document.getElementById("loginForm");

    fetch("/api/login", {
      method: "post",
      body: new URLSearchParams(new FormData(loginForm))
    })
    .then(response => response.text())
    .then(data => {
      console.log(data);
    })
  }

  register() {
    const registerForm = document.getElementById("registerForm");

    fetch("/api/register", {
      method: "post",
      body: new URLSearchParams(new FormData(registerForm))
    })
    .then(response => response.text())
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
          gridSize={this.state.gridSize}
          gridHeight={this.state.gridHeight}
          mouseHold={this.state.mouseHold}
          opacity={this.state.opacity}
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
          save={this.save}
          settings={this.settings}
          home={this.state.content}
          opacity={this.state.opacity}
          login={this.login}
          register={this.register}
        />
        {content} 
        />
        <Footer />
      </div>
    );
  }
}

ReactDOM.render(<App />, document.getElementById('app'));