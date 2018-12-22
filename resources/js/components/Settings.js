import React, { Component } from 'react';

class Settings extends Component {
  constructor (props) {
    super(props)

    this.updateGridSizeSlider = this.updateGridSizeSlider.bind(this);
    this.updateIntensitySlider = this.updateIntensitySlider.bind(this);
  }

  componentDidMount() {
    document.getElementById("gridSizeSlider").value = this.props.gridSize;

    document.getElementById("gridSizeSlider").addEventListener("mouseup", (e) => {
      e.preventDefault();
      this.props.saveCurrentSettings();
      this.props.clear();
    })

    document.getElementById("intensitySlider").addEventListener("mouseup", (e) => {
      e.preventDefault();
      this.props.saveCurrentSettings();
    })
  }

  updateGridSizeSlider() {
    document.getElementById("gridSizeValue").textContent = document.getElementById("gridSizeSlider").value;
  }

  updateIntensitySlider() {
    document.getElementById("intensityValue").textContent = document.getElementById("intensitySlider").value;
  }

  render() {
    return (
      <div id="settingsDrawing">
        <button id="settingsButton" onClick={this.props.showSettings}><i className="fas fa-angle-double-down"></i> Settings</button>

        <form id="settingsForm">
          <hr />

          <div className="settingsSection">
            <span>Grid Size: </span>
            <span id="gridSizeValue">20</span>
          </div>
          <div className="settingsSection">
            <span id="gridSizeMin">5</span>
            <input type="range" min="5" max="50" defaultValue="20" name="grid_size" id="gridSizeSlider" onChange={this.updateGridSizeSlider} />
            <span id="gridSizeMax">50</span>
          </div>

          <hr />

          <div className="settingsSection">
            <span>Intensity: </span>
            <span id="intensityValue">0.3</span>
          </div>
          <div className="settingsSection">
            <span id="intensityMin">0.1</span>
            <input type="range" min="0.1" max="1.0" step="0.1" defaultValue="0.3" name="intensity" id="intensitySlider" onChange={this.updateIntensitySlider} />
            <span id="intensityMax">1</span>
          </div>

          <hr />

          <div className="settingsSection">
            <span>Main Color: </span>
            <input type="color" name="main_color" id="mainColorPicker" defaultValue="#008000" onChange={this.props.saveCurrentSettings} />
          </div>
          <div>
            <button className="mainColor blue" value="#0088FF" onClick={this.props.setMainColor} />
            <button className="mainColor yellow" value="#FFAA00" onClick={this.props.setMainColor} />
            <button className="mainColor orange" value="#FF7700" onClick={this.props.setMainColor} />
            <button className="mainColor red" value="#FF0033" onClick={this.props.setMainColor} />
            <button className="mainColor purple" value="#9911AA" onClick={this.props.setMainColor} />
            <button className="mainColor green" value="#AADD22" onClick={this.props.setMainColor} />
          </div>

          <hr />

          <div className="settingsSection">
            <span>Background Color: </span>
            <input type="color" name="background_color" id="backgroundColorPicker" defaultValue="#ffffff" onChange={this.props.saveCurrentSettings} />
          </div>
          <div>
            <button className="backgroundColor blue" value="#0088FF" onClick={this.props.setBackgroundColor} />
            <button className="backgroundColor yellow" value="#FFAA00" onClick={this.props.setBackgroundColor} />
            <button className="backgroundColor orange" value="#FF7700" onClick={this.props.setBackgroundColor} />
            <button className="backgroundColor red" value="#FF0033" onClick={this.props.setBackgroundColor} />
            <button className="backgroundColor purple" value="#9911AA" onClick={this.props.setBackgroundColor} />
            <button className="backgroundColor green" value="#AADD22" onClick={this.props.setBackgroundColor} />
          </div>

          <hr />

          <div className="settingsSection">
            <span>Shape: </span>
            <select name="shape" id="shape" onChange={this.props.saveCurrentSettings} >
              <option value="square" className="shape">Square</option>
              <option value="round" className="shape">Round</option>
            </select>
          </div>

          <hr />

          <input type="text" name="title" value={this.props.title} placeholder="Title" id="titleInput" required onChange={this.props.saveCurrentSettings} />

          <div className="settingsSection">
            <input type="button" id="saveDefaultSettings" value="Save Default" onClick={this.props.saveDefaultSettings} />
            <input type="button" id="loadDefaultSettings" value="Load Default" onClick={this.props.loadDefaultSettings} />
          </div>
        </form>
      </div>
    )
  }
}

export default Settings;