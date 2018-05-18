import React, {Component} from 'react';
import {render} from 'react-dom'
import {createStore, applyMiddleware, compose} from 'redux'
import {createLogger} from 'redux-logger'
import {Provider} from 'react-redux'
import Profile from './views/Profile/Profile.jsx'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from "material-ui/styles/getMuiTheme";
import lightBaseTheme from "material-ui/styles/baseThemes/lightBaseTheme";

// Import the reducer and create a store
import {reducer} from './cryptoryRedux.jsx'
import thunkMiddleware from 'redux-thunk';

// import { persistStore, persistReducer } from 'redux-persist'
// import storage from 'redux-persist/lib/storage' // defaults to localStorage for web and AsyncStorage for react-native
// import { PersistGate } from 'redux-persist/integration/react'

// const persistConfig = {
//   key: 'root',
//   storage,
// }
// const persistedReducer = persistReducer(persistConfig, reducer)

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(
  // persistedReducer,
  reducer,
  composeEnhancers(
    applyMiddleware(
      thunkMiddleware,
      // createLogger()
    )));

// const persistor = persistStore(store)

const AppWithStore = (
  <Provider store={store}>
    <MuiThemeProvider muiTheme={getMuiTheme(lightBaseTheme)}>
      <Profile/>
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

