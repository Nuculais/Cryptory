import React, {Component} from 'react'
import './App.css'
import Welcome from './views/Welcome/Welcome'
import {Provider} from 'react-redux'
import {createStore, applyMiddleware} from 'redux'
import rootReducer, {DEFAULT_STATE} from './reducers'
import {render} from 'react-dom'
import createSagaMiddleware from 'redux-saga'
import rootSaga from './sagas'

const sagaMiddleware = createSagaMiddleware()
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(
  rootReducer,
  DEFAULT_STATE,
  composeEnhancers(applyMiddleware(sagaMiddleware))
);

sagaMiddleware.run(rootSaga)


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
  <Provider store={store}>
    <App/>
  </Provider>
  ,
  document.getElementById('app'));

if (module.hot) {
  module.hot.accept();
}
