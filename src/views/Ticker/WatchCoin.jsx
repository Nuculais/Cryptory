import React from 'react';

export default class WatchCoin extends React.Component {
  constructor(props) {
    super(props)
  }

  // getInitialState = () => ''

  watchCoin = () => {
    this.props.watchCoinHandler(this.state.symbol);
    this.setState({symbol: ''});
  }

  handleChange = (event) =>
    this.setState({symbol: event.target.value});

  render() {

    return (
      <div className="row">
        <p>Available stocks for demo: MCD, BA, BAC, LLY, GM, GE, UAL, WMT, AAL, JPM</p>
        <div className="input-group">
          <input type="text" className="form-control" placeholder="Comma separated list of stocks to watch..."
                 value={this.state.symbol} onChange={this.handleChange}/>
          <span className="input-group-btn">
                        <button className="btn btn-default" type="button" onClick={this.watchCoin}>
                            <span className="glyphicon glyphicon-eye-open" aria-hidden="true"></span> Watch
                        </button>
                    </span>
        </div>
      </div>
    );
  }
}
