import React from 'react'
import {connect} from 'react-redux'
import CoinRow from "./CoinRow";
import socketIOClient from "socket.io-client";
import Progress from '../Progress/Progress'
import {actionCreators} from "../../cryptoryRedux";

const mapStateToProps = (state) => ({
  profile: state,
  endpoint: state.endpointTicker
})

const mapDispatchToProps = (dispatch) => ({
  // loadProfile: id => {
  //   dispatch(actionCreators.fetchUser(id))
  // }
})

class CoinTable extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      coins: [],
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
        },
        'ETH': {
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
        },
        'ALT': {
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
      }
    }
  }

  componentDidMount() {
    console.log('cointable props', this.props)
    const endpoint = this.props.endpoint;
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
          },
          'ETH': {
            'SEK': {
              last: this.state.currencies['ETH']['SEK']['current'],
              current: data.BTC.SEK
            },
            'USD': {
              last: this.state.currencies['ETH']['USD']['current'],
              current: data.BTC.USD
            },
            'EUR': {
              last: this.state.currencies['ETH']['EUR']['current'],
              current: data.BTC.EUR
            }
          },
          'ALT': {
            'SEK': {
              last: this.state.currencies['ALT']['SEK']['current'],
              current: data.BTC.SEK
            },
            'USD': {
              last: this.state.currencies['ALT']['USD']['current'],
              current: data.BTC.USD
            },
            'EUR': {
              last: this.state.currencies['ALT']['EUR']['current'],
              current: data.BTC.EUR
            }
          },
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
          }, {
            id: 2,
            name: 'ETH',
            prices: [
              {
                id: 1,
                name: 'SEK',
                data: [
                  {
                    id: 1,
                    current: this.state.currencies['ETH']['SEK']['current'],
                  },
                  {
                    id: 2,
                    last: this.state.currencies['ETH']['SEK']['last']
                  }
                ],
              },
              {
                id: 2,
                name: 'EUR',
                data: [
                  {
                    id: 1,
                    current: this.state.currencies['ETH']['EUR']['current'],
                  },
                  {
                    id: 2,
                    last: this.state.currencies['ETH']['EUR']['last']
                  }
                ],
              },
              {
                id: 3,
                name: 'USD',
                data: [
                  {
                    id: 1,
                    current: this.state.currencies['ETH']['USD']['current'],
                  },
                  {
                    id: 2,
                    last: this.state.currencies['ETH']['USD']['last']
                  }
                ],
              }
            ]
          },
          {
            id: 3,
            name: 'ALT',
            prices: [
              {
                id: 1,
                name: 'SEK',
                data: [
                  {
                    id: 1,
                    current: this.state.currencies['ALT']['SEK']['current'],
                  },
                  {
                    id: 2,
                    last: this.state.currencies['ALT']['SEK']['last']
                  }
                ],
              },
              {
                id: 2,
                name: 'EUR',
                data: [
                  {
                    id: 1,
                    current: this.state.currencies['ALT']['EUR']['current'],
                  },
                  {
                    id: 2,
                    last: this.state.currencies['ALT']['EUR']['last']
                  }
                ],
              },
              {
                id: 3,
                name: 'USD',
                data: [
                  {
                    id: 1,
                    current: this.state.currencies['ALT']['USD']['current'],
                  },
                  {
                    id: 2,
                    last: this.state.currencies['ALT']['USD']['last']
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
  }

  render() {
    // let items = [];
    // for (let symbol in this.props.coins) {
    //   let coin = this.props.coins[symbol];
    //   items.push(<CoinRow key={coin.symbol} coin={coin} last={this.props.last}
    //                       unwatchCoinHandler={this.props.unwatchCoinHandler}/>);
    // }
    return (
      <div className="row">
        {this.state.coins ? this.state.coins.map((coin) => {
            return (
              <li key={coin.id}>
                <div>{coin.name}</div>
                <ul>
                  {coin.prices.map(currency => {
                    return <li key={currency.id}>
                      <div>{currency.name}</div>
                      {currency.data.map(fiat => {
                        // console.log('iat', fiat)
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
        <table className="table-hover">
          <thead>
          <tr>
            <th>Symbol</th>
            <th>Open</th>
            <th>Last</th>
            <th>Change</th>
            <th>High</th>
            <th>Low</th>
            <th>Unwatch</th>
          </tr>
          </thead>
          <tbody>
          {/*{items}*/}
          </tbody>
        </table>
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(CoinTable)