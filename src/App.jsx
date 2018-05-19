import React, {Component} from 'react';
import {Grid} from 'react-flexbox-grid';
import Welcome from './views/Welcome/Welcome';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import lightBaseTheme from 'material-ui/styles/baseThemes/lightBaseTheme';
import darkBaseTheme from 'material-ui/styles/baseThemes/darkBaseTheme';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import {Card} from 'material-ui/Card'
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
  <MuiThemeProvider
    muiTheme={time() > 19 || time() < 7
      ? getMuiTheme(darkBaseTheme)
      : getMuiTheme(lightBaseTheme)}>
    <Grid fluid>
      <Card>
        <App/>
      </Card>
    </Grid>
  </MuiThemeProvider>
  ,
  document.getElementById('app'));

if (module.hot) {
  module.hot.accept();
}