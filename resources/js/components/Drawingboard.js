import React, { Component } from 'react';

class Drawingboard extends Component {
  constructor (props) {
    super(props)

    this.mousedown = this.mousedown.bind(this);
    this.mouseup = this.mouseup.bind(this);
    this.createGrid = this.createGrid.bind(this);
  }

  componentDidMount() {
    const drawingBoard = document.getElementById("drawingBoard");

    drawingBoard.style.height = this.props.gridHeight + "px";
    drawingBoard.style.width = this.props.gridHeight + "px";
    drawingBoard.style.border = "2px solid green";

    document.addEventListener("mousedown", this.mousedown)
    document.addEventListener("mouseup", this.mouseup)

    this.createGrid();
  }
  
  componentWillUnmount() {
    document.removeEventListener("mousedown", this.mousedown);
    document.removeEventListener("mouseup", this.mouseup);
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

  createGrid() {
    const gridItemDimension = this.props.gridHeight/this.props.gridSize + "px";
    let newOpacity = [];

    for (let i = 0; i < (this.props.gridSize * this.props.gridSize); i++) {
      const gridItem = document.createElement("div");

      gridItem.style.width = gridItemDimension;
      gridItem.style.height = gridItemDimension;
      gridItem.style.boxSizing = "border-box"
      gridItem.style.border = "2px solid white";
      gridItem.style.float = "left";
      gridItem.style.backgroundColor = "green";
      gridItem.style.opacity = 0;
      gridItem.className = "gridItem";
      
      document.getElementById("drawingBoard").appendChild(gridItem);
      
      newOpacity[i] = 0;

      this.setState({
        opacity: newOpacity
      })

      /*
      gridItem.addEventListener("mouseover", e => {
        console.log(this.props.mouseHold)

        if (this.props.mouseHold) {
          let newOpacity = this.state.opacity.slice();

          newOpacity[i] += 0.1;

          this.setState({
            opacity: newOpacity
          })

          this.style.opacity = this.state.opacity[i];
        }
      })
      */

      
      let self = this;

      gridItem.addEventListener("mouseover", function() {
        if (self.state.mouseHold) {
          let newOpacity = self.state.opacity.slice();

          newOpacity[i] += 0.1;

          self.setState({
            opacity: newOpacity
          })

          if (this.style.opacity < 1) this.style.opacity = self.state.opacity[i];
        }
      })
      
    }
  }

  render() {
    return (
      <div id="drawingBoard" />
    )
  }
}

export default Drawingboard;