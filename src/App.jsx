import React, {Component} from 'react';
// import './App.css';
import {Route, Router, hashHistory, Redirect, BrowserRouter} from 'react-router-dom';
import Welcome from './views/Welcome/Welcome';
import Home from './views/Home/Home';
// import Profile from './views/Profile/Profile'
import {render} from "react-dom";

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      title: 'Cryptory',
    }
  }

  // TODO: ROUTER LOGIC
  // {/*<Route path="/" render={(props) => <Home data={JSON.parse(this.state.user)} {...props}/>}/>*/}
  //  <Route exact path="/" render={() => <Welcome/>}/>}

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
  <BrowserRouter>
    <App/>
  </BrowserRouter>
  ,
  document.getElementById('app'));

module.hot.accept();
