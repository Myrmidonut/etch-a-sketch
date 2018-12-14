import React, { Component } from 'react';

class Gallery extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    document.getElementById("galleryContent").textContent = "Loading";

    fetch("/api/drawings")
    .then(response => response.json())
    .then(data => {
      document.getElementById("galleryContent").textContent = "";

      data.forEach((e, i) => {
        const drawing = document.createElement("div");
        drawing.id = "preview" + i;
        document.getElementById("galleryContent").appendChild(drawing);

        const gridHeight = 200;

        const gridItemDimension = gridHeight/e.grid_size + "px";
    
        document.getElementById("preview" + i).style.backgroundColor = e.background_color;
        document.getElementById("preview" + i).style.height = gridHeight + "px";
        document.getElementById("preview" + i).style.width = gridHeight + "px";
        document.getElementById("preview" + i).style.border = "2px solid green";

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
          
          document.getElementById("preview" + i).appendChild(gridItem);
        }
      })
    })
  }

  render() {
    return (
      <div id="galleryContent" />
    )
  }
}

export default Gallery;