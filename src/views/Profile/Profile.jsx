import React from 'react';
import {Link} from 'react-router-dom';
import {render} from "react-dom";

// import DefaultLayout from './layouts/default.jsx'

class Profile extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      title: 'Cryptory Profile',
      status_prof: 'INITIAL',
      status_ticker: 'INITIAL',
      user: '',
      currencies: ''
    };

    // TODO: pull user preferences into url call
    const CUR_API = `https://min-api.cryptocompare.com/data/price?fsym=BTC&tsyms=USD,JPY,EUR`
    loadCurrencyData = () => {
      fetch(
        CUR_API)
        .then(response => {
          if (response.ok) {
            response.json().then(data => {
              this.setState({
                status: 'LOADED',
                currency: data
              })
            })
          } else {
            response.json().then(error => {
              alert("Failed to fetch issues:" + error.message)
            });
          }
        }).catch(err => {
        alert("Error in fetching currency data from server:", err);
      });
    };

    loadData = () => {
      fetch(`api/user/${user.data}`).then(response => {
        if (response.ok) {
          response.json().then(data => {
            this.setState({
              status: 'LOADED',
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

    componentDidMount()
    {
      this.loadData()
      this.loadCurrencyData()
    }

    render()
    {
      console.log('home props', this.props)
      let profile, graphs, ticker = ''
      switch (this.state.status_prof) {
        case 'INITIAL':
          profile = <em>Loading...</em>
          graph = <em>Loading...</em>
          break;
        case 'LOADED':
          profile =
            <div>
              <h3>Welcome, {this.state.user.data.name}!</h3>
              <img src={this.state.user.data.avatar}/>
            </div>
          graphs = this.state.user.data.following.map((currency) =>
            <li key={currency.id}>{currency}</li>
          );
          break;
      }
      switch (this.state.status_ticker) {
        case 'INITIAL':
          ticker = <em>Loading..</em>
          break;
        case 'LOADED':
          ticker = <div>{this.state.currencies}</div>
          break;
      }
      {
        console.log(this.state)
      }

      return (
        <div>
          <h1>{this.state.title}</h1>
          {profile}
          <h2>Your Currencies:</h2>
          {graphs}
          <br/>
          {ticker}
          <br/>
          <p><a href="/logout">log out</a></p>
        </div>
      );
    }
  }
}

render(
  <Profile/>,
  document.getElementById('profile'));

module.hot.accept();
