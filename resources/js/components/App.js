import React, { Component } from 'react';
import ReactDOM from 'react-dom';

class App extends Component {
  constructor (props) {
    super(props)
    
    this.state = {
      test: "test"
    }

    //this.handleFieldChange = this.handleFieldChange.bind(this)
  }

  render() {
    return (
      <div>
        {this.state.test}
      </div>
    );
  }
}

ReactDOM.render(<App />, document.getElementById('app'));