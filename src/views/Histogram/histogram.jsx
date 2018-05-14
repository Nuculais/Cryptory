//This is the view displaying histograms etc.
import React, {Component} from 'react';
import {render} from 'react-dom';
//import {VictoryChart, VictoryLine} from 'victory'; //Check for actual path.
// import './histogram.css';
import {modelInstance} from '../../data/APIetcModel';

//import Slider from 'rc-slider/lib/Slider';
//import Range from 'rc-slider/lib/Range';
//import 'rc-slider/assets/index.css'; //These three need to be downloaded through npm. Check the paths.
//Also import react-bootstrap-slider from github/brownieboy
//import the other user data somehow

class histogram extends Component {
  constructor(props) {
    super(props);
    this.state = {
      status: 'INITIAL',
      histogramdata: this.props.model.histogramData(1),
      slidervalue: 1,
      currentCurr: 'BTC'
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
      histogramdata: this.props.model.histogramData(this.state.slidervalue), 
      currentCurr: this.props.model.getCurrentCurr()
    })
  }

  newCurr = (e) => {
    this.props.model.setCurrentCurr(e.target.value);
    this.setState({currentCurr: e.target.value});
  }

  OnSliderChangeValue(e) {
    this.setState({ slidervalue: e.target.value });
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
            <h2>Current price: </h2><p>{this.props.model.getCurrentPrice(this.state.currentCurr, 'SEK')}</p>
          </div>

          <div className='row' id='graphOfSelectedCurrency'>
            <VictoryChart>
              <VictoryLine
                data={this.props.model.histogramData(slidervalue)}
              />
            </VictoryChart>
            <ReactBootstrapSlider
              max={3}
              min={1}
              step={1}
              ticks={[1, 2, 3]}
              ticks_labels = {["Day", "Week", "Month"]}
              tooltip="hide"
              change={this.state.OnSliderChangeValue}
              value={this.state.slidervalue} 
              />
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

render(
  <histogram/>,
  document.getElementById('histogram'));

if (module.hot) {
  module.hot.accept();
}
