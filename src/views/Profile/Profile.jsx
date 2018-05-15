import React from 'react';
import {Link} from 'react-router-dom';
import {render} from "react-dom";
import Progress from '../Progress/Progress'
// import WatchCoin from '../Ticker/WatchCoin'
import CoinTable from '../Ticker/CoinTable'
// import feed from '../../feed-socket.io'
import socketIOClient from "socket.io-client";
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import lightBaseTheme from 'material-ui/styles/baseThemes/lightBaseTheme';
import getMuiTheme from 'material-ui/styles/getMuiTheme';


class Profile extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      title: 'Cryptory Profile',
      status_prof: 'INITIAL',
      status_ticker: 'INITIAL',
      user: '',
    }
  }

  // TODO: pull user preferences into
  loadProfileData = () => {
    console.log('props', user.data)
    fetch(`api/user/${user.data}`).then(response => {
      if (response.ok) {
        response.json().then(data => {
          this.setState({
            status_prof: 'LOADED',
            user: data
          });
        });
      } else {
        response.json().then(error => {
          alert("Failed to fetch issues:" + error.message)
        });
      }
    }).catch(err => {
      alert("Error in fetching user data from server:", err);
    });
  };

  componentDidMount = () => {
    this.loadProfileData()
  }

  render() {
    let profile;
    switch (this.state.status_prof) {
      case 'INITIAL':
        profile = <Progress/>
        break;
      case 'LOADED':
        profile =
          <div>
            <h3>Welcome, {this.state.user.data.name}!</h3>
            <img src={this.state.user.data.avatar}/>
         </div>
        break;
    }

    return (
      <div>
        <h1>{this.state.title}</h1>
        {profile}
        <h2>Your Following:</h2>
        <br/>
        <CoinTable following={this.state.user.following}/>
        <p><a href="/logout">log out</a></p>
      </div>
    );
  }
}

render(
  <MuiThemeProvider muiTheme={getMuiTheme(lightBaseTheme)}>
    <Profile/>
  </MuiThemeProvider>,
  document.getElementById('profile'));

if (module.hot) {
  module.hot.accept();
}
