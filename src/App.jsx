import React, {Component} from 'react';
import {Grid} from 'react-flexbox-grid';
import Welcome from './views/Welcome/Welcome';
import {render} from "react-dom";

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

const time = () => {
  let hour = new Date()
  return hour.getHours()
}

render(
    <Grid fluid>
        <App/>
    </Grid>
  ,
  document.getElementById('app'));

if (module.hot) {
  module.hot.accept();
}