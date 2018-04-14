import React, {Component} from 'react';
// import './App.css';
import {Route} from 'react-router-dom';
import {BrowserRouter} from 'react-router-dom'
import Welcome from './views/Welcome/Welcome';
import Home from './views/Home/Home';
import Profile from './views/Profile/Profile'
import {render} from "react-dom";
import {AppContainer} from 'react-hot-loader';

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      title: 'Cryptory',
      user: user.data
    }
  }

  render() {
    let curUser = false
    if (this.state.user) {
      curUser = JSON.parse(this.state.user);
    }
    console.log('app data', curUser)
    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title container-fluid">{this.state.title}</h1>
          <Route path="/profile" render={() => <Profile user={curUser}/>}/>
          {curUser ?
            <Route exact path="/" render={() => <Home user={curUser}/>}/>
            :
            <Route exact path="/" render={() => <Welcome/>}/>}

        </header>
      </div>
    )
  }
}

render(
  <AppContainer>
    <BrowserRouter>
      <App/>
    </BrowserRouter>
  </AppContainer>,
  document.getElementById('app'));

module.hot.accept();
