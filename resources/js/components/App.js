import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import Navbar from "./Navbar";
import Drawingboard from "./Drawingboard";
import Footer from "./Footer";
import Gallery from "./Gallery";

class App extends Component {
  constructor (props) {
    super(props)
    
    this.state = {
      content: "Drawingboard"
    }

    // this.handleMouseDown = this.handleMouseDown.bind(this)
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
        <Drawingboard />
      )
    } else {
      content = (
        <Gallery />
      )
    }

    return (
      <div className="App">
        <Navbar home={this.state.content}/>
        {content} 
        <Footer />
      </div>
    );
  }
}

ReactDOM.render(<App />, document.getElementById('app'));