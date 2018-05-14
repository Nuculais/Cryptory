import React, {Component} from 'react';
import './App.css'
import Welcome from './views/Welcome/Welcome';
import {render} from "react-dom";
import histogram from './views/Histogram/histogram';
//import 'bootstrap/dist/css/bootstrap.min.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: 'Cryptory',
    }
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title container-fluid">{this.state.title}</h1>
          <Welcome/>
        </header>
      </div>
    )
  }
}

render(
  <App/>
  ,
  document.getElementById('app'));

if (module.hot) {
  module.hot.accept();
}
