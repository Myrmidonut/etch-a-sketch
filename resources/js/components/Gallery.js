import React, { Component } from 'react';

class Gallery extends Component {
  constructor(props) {
    super(props);
  }

  componentWillUnmount() {
    document.getElementById("drawingBoard").style.display = "block";
    document.getElementById("settingsForm").style.display = "none";
  }

  componentDidMount() {
    document.getElementById("galleryLatestContainer").textContent = "Loading";
    document.getElementById("galleryPersonalContainer").textContent = "Loading";
    document.getElementById("drawingBoard").style.display = "none";
    document.getElementById("navbar").style.height = "83px";

    if (this.props.accountId) {
      this.props.loadPersonalDrawings(this.props.accountId);
    } else {
      document.getElementById("galleryPersonalContainer").textContent = "Not logged in";
    }

    this.props.loadLatestDrawings();
    //this.props.showLatestDrawings();
  }

  render() {
    return (
      <div id="galleryContainer">
        <div id="galleryLatest">
          <h2>Latest Drawings</h2>
          <button id="galleryLatestPrevious" onClick={this.props.galleryLatestBlockDecrease}>Back</button>
          <div id="galleryLatestContainer" />
          <button id="galleryLatestNext" onClick={this.props.galleryLatestBlockIncrease}>Next</button>
        </div>

        <div id="galleryPersonal">
          <h2>Personal Drawings</h2>
          <button id="galleryLatestPrevious" onClick={this.props.galleryPersonalBlockDecrease}>Back</button>
          <div id="galleryPersonalContainer" />
          <button id="galleryLatestNext" onClick={this.props.galleryPersonalBlockIncrease}>Next</button>
        </div>
      </div>
    )
  }
}

export default Gallery;