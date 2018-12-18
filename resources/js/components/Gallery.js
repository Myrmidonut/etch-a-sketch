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
  }

  render() {
    return (
      <div id="galleryContainer">
        <div id="galleryLatest">
          <h2>Latest Drawings</h2>
          <div id="galleryLatestContainer" />
        </div>

        <div id="galleryPersonal">
          <h2>Personal Drawings</h2>
          <div id="galleryPersonalContainer" />
        </div>
      </div>
    )
  }
}

export default Gallery;