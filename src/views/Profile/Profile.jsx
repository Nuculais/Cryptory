import React from 'react';
import {Link} from 'react-router-dom';
import {render} from "react-dom";
import Progress from '../Progress/Progress'
// import WatchCoin from '../Ticker/WatchCoin'
// import CoinTable from '../Ticker/CoinTable'
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
      currencies: {
        'BTC': {
          'SEK': {
            'current': '',
            'last': '',
          },
          'USD': {
            'current': '',
            'last': ''
          },
          'EUR': {
            'current': '',
            'last': ''
          }
        }
      },
      endpoint: "http://localhost:4001"
    }
  }

  // getInitialState() {
  //   let coins = {};
  //   feed.watch(['MCD', 'BA', 'BAC', 'LLY', 'GM', 'GE', 'UAL', 'WMT', 'AAL', 'JPM']);
  //   feed.onChange(function (coin) {
  //     coins[coin.symbol] = coin;
  //     this.setState({coins: coins, last: coin});
  //   }.bind(this));
  //   return {coins: coins};
  // }

  watchCoin(symbols) {
    symbols = symbols.replace(/ /g, '');
    let arr = symbols.split(",");
    feed.watch(arr);
  }

  unwatchCoin(symbol) {
    feed.unwatch(symbol);
    let coins = this.state.coins;
    delete coins[symbol];
    this.setState({coins: coins});
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
    const endpoint = this.state.endpoint;
    const socket = socketIOClient(endpoint);
    this.setState({status_ticker: 'INITIAL'})
    socket.on("coins", data => {
      // console.log('received socket data', data.BTC)
      this.setState({
        currencies: {
          'BTC': {
            'SEK': {
              last: this.state.currencies['BTC']['SEK']['current'],
              current: data.BTC.SEK
            },
            'USD': {
              last: this.state.currencies['BTC']['USD']['current'],
              current: data.BTC.USD
            },
            'EUR': {
              last: this.state.currencies['BTC']['EUR']['current'],
              current: data.BTC.EUR
            }
          }
        },
        coins: [
          {
            id: 1,
            name: 'BTC',
            prices: [
              {
                id: 1,
                name: 'SEK',
                data: [
                  {
                    id: 1,
                    current: this.state.currencies['BTC']['SEK']['current'],
                  },
                  {
                    id: 2,
                    last: this.state.currencies['BTC']['SEK']['last']
                  }
                ],
              },
              {
                id: 2,
                name: 'EUR',
                data: [
                  {
                    id: 1,
                    current: this.state.currencies['BTC']['EUR']['current'],
                  },
                  {
                    id: 2,
                    last: this.state.currencies['BTC']['EUR']['last']
                  }
                ],
              },
              {
                id: 3,
                name: 'USD',
                data: [
                  {
                    id: 1,
                    current: this.state.currencies['BTC']['USD']['current'],
                  },
                  {
                    id: 2,
                    last: this.state.currencies['BTC']['USD']['last']
                  }
                ],
              }
            ]
          },
        ],
        //   {
        //     id: 2,
        //     name: 'ETH',
        //     data: [
        //       {id: 1, price: 'SEK: ' + data.ETH.SEK},
        //       {id: 2, price: 'EUR: ' + data.ETH.EUR},
        //       {id: 3, price: 'USD: ' + data.ETH.USD}
        //     ]
        //   },
        //   {
        //     id: 3,
        //     name: 'ETH',
        //     data: [
        //       {id: 1, price: 'SEK: ' + data.ETH.SEK},
        //       {id: 2, price: 'EUR: ' + data.ETH.EUR},
        //       {id: 3, price: 'USD: ' + data.ETH.USD}
        //     ]
        //   },
        // ],
        //   {
        //     id: 4,
        //     name: 'C',
        //     data:
        //       [
        //         {
        //           id: 1, price: {
        //             id: 1,
        //             name: 'SEK',
        //             data: {
        //               id: 1,
        //               current: data.BTC.SEK,
        //               id: 2,
        //               last: this.state.currencies['BTC']['SEK']['last']
        //             }
        //           }
        //         },
        //         {
        //           id: 2, price: {
        //             id: 1, 'EUR': {
        //               value: data.BTC.EUR
        //             }
        //           }
        //         },
        //         {
        //           id: 3, price: {
        //             id: 1, 'USD': {
        //               value: data.BTC.USD
        //             }
        //           }
        //         }
        //       ]
        //   },
        // ],
        //   {
        //     id: 2,
        //     name: 'ETH',
        //     data:
        //       [
        //         {
        //           id: 1, price: {
        //             id: 1, 'SEK': {
        //               value: data.ETH.SEK
        //             }
        //           }
        //         },
        //         {
        //           id: 2, price: {
        //             id: 1, 'EUR': {
        //               value: data.ETH.EUR
        //             }
        //           }
        //         },
        //         {
        //           id: 3, price: {
        //             id: 1, 'USD': {
        //               value: data.ETH.USD
        //             }
        //           }
        //         }
        //       ]
        //   },
        //   {
        //     id: 3,
        //     name: 'ALT',
        //     data:
        //       [
        //         {
        //           id: 1, price: {
        //             id: 1, 'SEK': {
        //               value: data.ALT.SEK
        //             }
        //           }
        //         },
        //         {
        //           id: 2, price: {
        //             id: 1, 'EUR': {
        //               value: data.ALT.EUR
        //             }
        //           }
        //         },
        //         {
        //           id: 3, price: {
        //             id: 1, 'USD': {
        //               value: data.ALT.USD
        //             }
        //           }
        //         }
        //       ]
        //   }
        // ],
        status_ticker: 'LOADED'
      })
      console.log('currencies', this.state.currencies)
      console.log('coins', this.state.coins)
    });
    this.loadProfileData()
  }

  handleColor = (data) => {
    // console.log('handlecolor data', data)
    return 'green'
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
        {/*{this.state.response}*/}
        <h1>{this.state.title}</h1>
        {profile}
        <h2>Your Following:</h2>
        {/*{console.log(this.state.coins)}*/}
        {/*{localStorage.setItem('bleh', JSON.stringify(this.state.coins))}*/}
        {this.state.coins ? this.state.coins.map((coin) => {
            return (
              <li key={coin.id}>
                <div>{coin.name}</div>
                <ul>
                  {coin.prices.map(currency => {
                    return <li key={currency.id}>
                      <div>{currency.name}</div>
                      {currency.data.map(fiat => {
                          let color = fiat.current < fiat.last ? {backgroundColor: 'green'} : {backgroundColor: 'red'}
                          return <ol key={fiat.id} style={color}>{fiat.current}</ol>
                        }
                      )}
                    </li>


                  })}
                </ul>
              </li>
            )
          })
          : <Progress/>}
        <br/>
        {/*<WatchCoin watchStockHandler={this.watchCoin}/>*/}
        {/*<CoinTable coins={this.state.coins} last={this.state.last} unwatchCoinHandler={this.unwatchCoin()}/>*/}
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
