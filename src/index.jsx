import React, {Component} from 'react';
import {render} from 'react-dom'
import {createStore, applyMiddleware, compose} from 'redux'
import {createLogger} from 'redux-logger'
import {Provider} from 'react-redux'
import Profile from './views/Profile/Profile.jsx'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from "material-ui/styles/getMuiTheme";
import darkBaseTheme from 'material-ui/styles/baseThemes/darkBaseTheme';
import lightBaseTheme from "material-ui/styles/baseThemes/lightBaseTheme";
import {Card} from 'material-ui/Card'
import {Grid} from 'react-flexbox-grid';

// Import the reducer and create a store
import {reducer} from './cryptoryRedux.jsx'
import thunkMiddleware from 'redux-thunk';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(
  reducer,
  composeEnhancers(
    applyMiddleware(
      thunkMiddleware,
      // createLogger()
    )));

const time = () => {
  let hour = new Date()
  return hour.getHours()
}

const AppWithStore = (
  <Provider store={store}>
    <MuiThemeProvider
      muiTheme={time() > 19 || time() < 7
        ? getMuiTheme(darkBaseTheme)
        : getMuiTheme(lightBaseTheme)}>
      <Card>
        <Grid fluid>
          <Profile/>
        </Grid>
      </Card>
    </MuiThemeProvider>
  </Provider>
)

if (module.hot) {
  module.hot.accept('./', () => {
    const nextRootReducer = require('./cryptoryRedux.jsx');
    store.replaceReducer(nextRootReducer);
  });
}

render(
  AppWithStore
  , document.getElementById('profile'))

