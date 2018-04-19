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
      coins: '',
      currency: 'SEK'
    }
  }

  // TODO: pull user preferences into url call
  loadCurrencyData() {
    const CUR_API = 'https://min-api.cryptocompare.com/data/pricemulti?fsyms=BTC,ETH,ALT&tsyms=SEK,EUR,USD'
    fetch(
      CUR_API)
      .then(response => {
        if (response.ok) {
          response.json().then(data => {
            this.setState({
              // status_ticker: 'LOADED',
              // coins: data,
              coins: [
                {
                  id: 1,
                  name: 'BTC',
                  data: [
                    {id: 1, price: 'SEK: ' + data['BTC']['SEK']},
                    {id: 2, price: 'EUR: ' + data['BTC']['EUR']},
                    {id: 3, price: 'USD: ' + data['BTC']['USD']}
                  ],
                },
                {
                  id: 2,
                  name: 'ETH',
                  data: [
                    {id: 1, price: 'SEK: ' + data['ETH']['SEK']},
                    {id: 2, price: 'EUR: ' + data['ETH']['EUR']},
                    {id: 3, price: 'USD: ' + data['ETH']['USD']}
                  ]
                },
                {
                  id: 3,
                  name: 'ALT',
                  data:
                    [
                      {id: 1, price: 'SEK: ' + data['ALT']['SEK']},
                      {id: 2, price: 'EUR: ' + data['ALT']['EUR']},
                      {id: 3, price: 'USD: ' + data['ALT']['USD']}
                    ]
                }
              ]
            });
            this.loadProfileData()
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

  convertObjToList(data) {
    let list = Object.keys(data).map(key => [String(key), data[key]])
    for (let i = 0; i < list.length; i++) {
      console.log(list[i][1] = list[i][1]['SEK'])
      // list[i] = [Object.keys(list[i][1]).map(key => [String(key), list[i][1][key]])]
    }
    return list
  }


  loadProfileData() {
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

  loadData() {
    this.loadCurrencyData()
  }

  componentDidMount() {
    this.loadData()
  }

  formatData(list1, list2) {
    let info = [];
    for (let i = 0; i < list2.length; i++) {
      if (list1.contains(list2[i])) {
        info.push(list2[i])
      }
    }
    return info
  }

  render() {
    // console.log('home props', this.props)
    let profile, graphs, ticker = ''
    switch (this.state.status_prof) {
      case 'INITIAL':
        profile = <em>Loading...</em>
        graphs = <em>Loading...</em>
        break;
      case 'LOADED':
        profile =
          <div>
            <h3>Welcome, {this.state.user.data.name}!</h3>
            <img src={this.state.user.data.avatar}/>
          </div>
        graphs = <ul>
          {console.log(this.state.coins)}{this.state.coins.map((coin) => {
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
        // graphs = this.state.user.data.following.map(name =>
        //   <li key={name.id}>{name} {this.state.coins.forEach(item =>
        //     item[`${name}`] ? 'yes' : 'no')}</li>)
        break;
    }
    switch (this.state.status_ticker) {
      case 'INITIAL':
        ticker = <em>Loading..</em>
        break;
      case 'LOADED':
        // console.log(this.state.currency)
        ticker = <div className={'ticker'}>
          BTC

        </div>
        break;
    }
    {
      // console.log(this.state)
    }

    return (
      <div>
        <h1>{this.state.title}</h1>
        {profile}
        <h2>Your Following:</h2>
        {graphs}
        <br/>
        <em>{`Prices as of ${Date().toLocaleString()}`}</em>
        <br/>
        <p><a href="/logout">log out</a></p>
      </div>
    );
  }
}

render(
  <Profile/>,
  document.getElementById('profile'));

module.hot.accept();
