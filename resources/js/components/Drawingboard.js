import React, { Component } from 'react';

class Drawingboard extends Component {
  constructor (props) {
    super(props)
  }

  componentDidMount() {
    const drawingBoard = document.getElementById("drawingBoard");

    drawingBoard.style.height = this.props.gridHeight + "px";
    drawingBoard.style.width = this.props.gridHeight + "px";

    document.getElementById("drawingBoard").addEventListener("mousedown", this.props.mousedown)
    document.addEventListener("mouseup", this.props.mouseup)

    this.props.createGrid();
    this.props.loadOneDrawing(51);
  }
  
  componentWillUnmount() {
    document.getElementById("drawingBoard").removeEventListener("mousedown", this.mousedown);
    document.getElementById("drawingBoard").removeEventListener("mouseup", this.mouseup);
  }

  componentDidUpdate(prevProps) {
    if (this.props.gridSize !== prevProps.gridSize) {
      this.props.createGrid();
    }
  }

  render() {
    return (
      <div id="drawingBoard" />
    )
  }
}

export default Drawingboard;