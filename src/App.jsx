import React, {Component} from 'react';
import {Grid} from 'react-flexbox-grid';
import Welcome from './views/Welcome/Welcome';
import {render} from "react-dom";
import {Card} from 'material-ui/Card';
import {Row, Col} from 'react-flexbox-grid';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

class App extends Component {
  render() {
    return (
      <div className="App">
        <Row>
          <Col xs={12}>
            <div className="pageLayout">
              <Row start="xs">
                <Col xs={6}>
                  <Card>
                    <Welcome/>
                  </Card>
                </Col>
              </Row>
            </div>
          </Col>
        </Row>
      </div>
    )
  }
}

render(
  <MuiThemeProvider>
    <Card>
      <Grid fluid>
        <App/>
      </Grid>
    </Card>
  </MuiThemeProvider>
  ,
  document.getElementById('app'));

if (module.hot) {
  module.hot.accept();
}