import React from 'react'

export default class CoinRow extends React.Component {

  unwatch = () => {
    this.props.unwatchCoinHandler(this.props.coin.symbol);
  }

  render() {
    let lastClass = '',
      changeClass = 'change-positive',
      iconClass = 'glyphicon glyphicon-triangle-top';
    if (this.props.coin === this.props.last) {
      lastClass = this.props.coin.change < 0 ? 'last-negative' : 'last-positive';
    }
    if (this.props.coin.change < 0) {
      changeClass = 'change-negative';
      iconClass = 'glyphicon glyphicon-triangle-bottom';
    }
    return (

      <tr>
        <td>{this.props.coin.symbol}</td>
        <td>{this.props.coin.open}</td>
        <td className={lastClass}>{this.props.coin.last}</td>
        <td className={changeClass}>{this.props.coin.change} <span className={iconClass} aria-hidden="true"></span>
        </td>
        <td>{this.props.coin.high}</td>
        <td>{this.props.coin.low}</td>
        <td>
          <button type="button" className="btn btn-default btn-sm" onClick={this.unwatch}>
            <span className="glyphicon glyphicon-eye-close" aria-hidden="true"></span>
          </button>
        </td>
      </tr>
    );
  }
}