import React, { Component } from 'react';

class Gallery extends Component {
  constructor(props) {
    super(props);
  }

  componentWillUnmount() {
    document.getElementById("drawingBoard").style.display = "block";
    document.getElementById("settingsForm").style.display = "none";

    document.getElementById("galleryLatestContainer").textContent = "Loading";
    document.getElementById("galleryPersonalContainer").textContent = "Loading";
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
  }

  render() {
    return (
      <div id="galleryContainer">
        <div id="galleryLatest">
          <h2>Latest Drawings</h2>
          <button className="galleryButtons" id="galleryLatestPrevious" onClick={this.props.galleryLatestBlockDecrease}>Previous</button>
          <div id="galleryLatestContainer" />
          <button className="galleryButtons" id="galleryLatestNext" onClick={this.props.galleryLatestBlockIncrease}>Next</button>
        </div>

        <div id="galleryPersonal">
          <h2>Personal Drawings</h2>
          <button className="galleryButtons" id="galleryLatestPrevious" onClick={this.props.galleryPersonalBlockDecrease}>Previous</button>
          <div id="galleryPersonalContainer" />
          <button className="galleryButtons" id="galleryLatestNext" onClick={this.props.galleryPersonalBlockIncrease}>Next</button>
        </div>
      </div>
    )
  }
}

export default Gallery;