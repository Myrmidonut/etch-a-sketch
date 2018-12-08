import React, { Component } from 'react';

class Drawingboard extends Component {
  constructor (props) {
    super(props)

    this.state = {
      gridSize: 32,
      gridHeight: 700,
      gridItem: [],
      opacity: [],
      mouseHold: false,
    }
  }

  componentDidMount() {
    const self = this;

    const drawingBoard = document.getElementById("drawingBoard");

    drawingBoard.style.height = this.state.gridHeight + "px";
    drawingBoard.style.width = this.state.gridHeight + "px";
    drawingBoard.style.border = "2px solid green";

    function mousedown(e) {
      e.preventDefault();

      self.setState({
        mouseHold: true
      })
    }

    function mouseup(e) {
      e.preventDefault();

      self.setState({
        mouseHold: false
      })
    }

    document.addEventListener("mousedown", mousedown)
    document.addEventListener("mouseup", mouseup)

    this.createGrid();
  }


  createGrid() {
    const self = this;
    const gridItemDimension = this.state.gridHeight/this.state.gridSize + "px";
    let newOpacity = [];

    for (let counter = 0; counter < (this.state.gridSize * this.state.gridSize); counter++) {
      const gridItem = document.createElement("div");

      gridItem.style.width = gridItemDimension;
      gridItem.style.height = gridItemDimension;
      gridItem.style.boxSizing = "border-box"
      gridItem.style.border = "2px solid white";
      gridItem.style.float = "left";
      gridItem.style.backgroundColor = "green";
      gridItem.style.opacity = 0;
      
      document.getElementById("drawingBoard").appendChild(gridItem);
      
      newOpacity[counter] = 0;

      this.setState({
        opacity: newOpacity
      })

      gridItem.addEventListener("mouseover", function() {
        if (self.state.mouseHold) {
          let newOpacity = self.state.opacity.slice();

          newOpacity[counter] += 0.1;

          self.setState({
            opacity: newOpacity
          })

          this.style.opacity = self.state.opacity[counter];
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