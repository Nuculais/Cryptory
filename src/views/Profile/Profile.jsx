import React from 'react';
import {Link} from 'react-router-dom';
import {render} from "react-dom";
import histogram from '../Histogram/histogram';
import APIetcModel from '../../data/APIetcModel';

class Profile extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      title: 'Cryptory Profile',
      status_prof: 'INITIAL',
      status_ticker: 'INITIAL',
      user: '',
      coins: '',
    }
  }

  startPolling = () => {
    const self = this;
    setTimeout(function () {
      self.loadCurrencyData(); // do it once and then start it up ...
      self._timer = setInterval(self.loadCurrencyData.bind(self), 15000);
    }, 1000);
  }

  // TODO: pull user preferences into url call
  loadCurrencyData = () => {
    fetch('/api/coin')
      .then(response => {
        if (response.ok) {
          response.json().then(data => {
            this.setState({
              status_ticker: 'LOADED',
              date: Date().toLocaleString(),
              coins: [
                {
                  id: 1,
                  name: 'BTC',
                  data: [
                    {id: 1, price: 'SEK: ' + data.info.coins['BTC']['SEK']},
                    {id: 2, price: 'EUR: ' + data.info.coins['BTC']['EUR']},
                    {id: 3, price: 'USD: ' + data.info.coins['BTC']['USD']}
                  ],
                },
                {
                  id: 2,
                  name: 'ETH',
                  data: [
                    {id: 1, price: 'SEK: ' + data.info.coins['ETH']['SEK']},
                    {id: 2, price: 'EUR: ' + data.info.coins['ETH']['EUR']},
                    {id: 3, price: 'USD: ' + data.info.coins['ETH']['USD']}
                  ]
                },
                {
                  id: 3,
                  name: 'ALT',
                  data:
                    [
                      {id: 1, price: 'SEK: ' + data.info.coins['ALT']['SEK']},
                      {id: 2, price: 'EUR: ' + data.info.coins['ALT']['EUR']},
                      {id: 3, price: 'USD: ' + data.info.coins['ALT']['USD']}
                    ]
                }
              ]
            });
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

  loadData = () => {
    this.loadProfileData()
    this.startPolling()
  }

  componentDidMount = () => {
    this.loadData()
  }

  componentWillUnmount = () => {
    if (this._timer) {
      clearInterval(this._timer);
      this._timer = null;
    }
  }

  render() {
    // console.log('home props', this.props)
    let profile, ticker = ''
    switch (this.state.status_prof) {
      case 'INITIAL':
        profile = <em>Loading...</em>
        break;
      case 'LOADED':
        profile =
          <div>
            <h3>Welcome, {this.state.user.data.name}!</h3>
            <img src={this.state.user.data.avatar}/>
          </div>
        break;
    }
    switch (this.state.status_ticker) {
      case 'INITIAL':
        ticker = <em>UPDATING...</em>
        break;
      case 'LOADED':
        ticker = <div className={'ticker'}>
          <em>{`Prices as of ${this.state.date}`}</em>
          <ul>
            {this.state.coins.map((coin) => {
              return (
                <li key={coin.id}>
                  <div>{coin.name}</div>
                  <ul>
                    {coin.data.map(currency => {
                      return <li key={currency.id}>{currency.price}</li>
                    })}
                  </ul>
                </li>
              )
            })}
          </ul>
        </div>
        break;
    }

    return (
      <div>
        <h1>{this.state.title}</h1>
        {profile}
        <h2>Your Following:</h2>
        {ticker}
        <br/>
        <p><a href="/logout">log out</a></p>
        <p><a href="/histogram" id="histo" className="btn">Wallet and historical exchange rates</a></p>
      </div>
    );
  }
}

render(
  <Profile/>,
  document.getElementById('profile'));

if (module.hot) {
  module.hot.accept();
}
