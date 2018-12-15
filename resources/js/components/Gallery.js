import React, { Component } from 'react';

class Gallery extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    document.getElementById("galleryLatest").textContent = "Loading";
    document.getElementById("galleryPopular").textContent = "Loading";

    fetch("/api/drawings")
    .then(response => response.json())
    .then(data => {
      // data[0] all
      // data[0] 5 latest

      document.getElementById("galleryLatest").textContent = "";

      data[1].forEach((e, i) => {
        const drawing = document.createElement("div");
        drawing.id = "previewLatest" + i;
        drawing.className = "previewLatest";

        document.getElementById("galleryLatest").appendChild(drawing);

        const gridHeight = 200;
        const gridItemDimension = gridHeight/e.grid_size + "px";
    
        document.getElementById("previewLatest" + i).style.backgroundColor = e.background_color;
        document.getElementById("previewLatest" + i).style.height = gridHeight + "px";
        document.getElementById("previewLatest" + i).style.width = gridHeight + "px";
        document.getElementById("previewLatest" + i).style.border = "2px solid green";

        document.getElementById("previewLatest" + i).addEventListener("click", f => {
          f.preventDefault();

          console.log("clicked " + e.id)
        })

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
          
          document.getElementById("previewLatest" + i).appendChild(gridItem);
        }
      })
   
      // -------------------

      document.getElementById("galleryPopular").textContent = "";

      data[0].forEach((e, i) => {
        const drawing = document.createElement("div");
        drawing.id = "previewPopular" + i;
        drawing.className = "previewPopular";

        document.getElementById("galleryPopular").appendChild(drawing);

        const gridHeight = 200;
        const gridItemDimension = gridHeight/e.grid_size + "px";
    
        document.getElementById("previewPopular" + i).style.backgroundColor = e.background_color;
        document.getElementById("previewPopular" + i).style.height = gridHeight + "px";
        document.getElementById("previewPopular" + i).style.width = gridHeight + "px";
        document.getElementById("previewPopular" + i).style.border = "2px solid green";

        document.getElementById("previewPopular" + i).addEventListener("click", f => {
          f.preventDefault();

          console.log("clicked " + e.id)
        })

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
          
          document.getElementById("previewPopular" + i).appendChild(gridItem);
        }
      })
    })
    .then(e => {
      console.log("done")
    })
  }

  render() {
    return (
      <div id="galleryContainer">
        <div id="galleryPopular"></div>
        <div id="galleryLatest"></div>
        <div id="galleryPersonal"></div>
      </div>
    )
  }
}

export default Gallery;