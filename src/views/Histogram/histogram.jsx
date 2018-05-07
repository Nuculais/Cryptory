//This is the view displaying histograms etc.
import React, {Component} from 'react';
import {render} from 'react-dom';
import {VictoryChart, VictoryLine} from 'victory'; //Check for actual path
// import './histogram.css';
import {modelInstance} from '../../data/APIetcModel';

//import the other user data somehow

class histogram extends Component {
  constructor(props) {
    super(props);
    this.state = {
      status: 'INITIAL',
      histogramdata: this.props.model.histogramData('day')
    }
  }

  componentDidMount = () => {
    this.props.model.addObserver(this)
    this.props.model.histogramData(slidervalue);

  }

  componentWillUnmount = () => {
    this.props.model.removeObserver(this)
  }

  update = () => {
    this.setState({
      histogramdata: this.props.model.histogramData(slidervalue)
    })
  }

  newCurr = (e) => {
    this.props.model.setCurrentCurr(e.target.value);
  }


  render() {
    return (
      <div className='row'>
        <div className='col-md-10'>
          <div className='col-md-5'>
            <select id='currenciesdropdown' onChange={this.newCurr}>
              <option>All the coins! Or rather, one option for each available coin in the API. (Note: Just saw that that
                is 4796 coins, so... nope. We pick 10 or so.)
              </option>
              <option value='BTC'>Bitcoin</option>
              <option value='ETH'>Ethereum</option>
              <option value='DOGE'>Dogecoin</option>
              <option value='XRP'>Ripple</option>
              <option value='ADA'>Cardano</option>
              <option value='TRX'>Tron</option>
              <option value='XVG'>Verge</option>
              <option value='LTC'>Litecoin</option>
              <option value='EOS'>EOS</option>
              <option value='NEO'>NEO</option>
            </select>
          </div>
          <div className='col-md-5'>
            <h2>Current price: </h2><p>{ResultOfAPICallPlaceholder}</p>
          </div>

          <div className='row' id='graphOfSelectedCurrency'>
            <VictoryChart>
              <VictoryLine
                data={ResultOfAnotherAPICallPlaceholder}
              />
            </VictoryChart>
            <Slider/>
          </div>

          <div className='row' id='graphOfUserWallet'>
            <VictoryChart>
              <VictoryLine

              />
            </VictoryChart>
          </div>

        </div>

      </div>
    )
  }
}

export default histogram;
