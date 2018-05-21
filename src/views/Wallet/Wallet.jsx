import React from 'react';
import './Wallet.css';
import {render} from "react-dom";

class Wallet extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      title: 'Cryptory Profile',
      status: 'INITIAL',
      user: '',
    }
  }

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

  loadData() {
    this.loadProfileData()
  }

  componentDidMount() {
    this.loadData()
    console.log(user.data)
  }

  render() {
    let profile
    switch (this.state.status) {
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

    return (
      <div className="pageLayout">
        <div className="navbar">
          <div>
            <img src="https://i.imgur.com/s5krUs0.png" width="100%"/>
          </div>
          <div>
            {profile}
          </div>
          <div className="myWallet">
            <h1 align="center">{this.state.title}</h1>
            <br/>
            <form>
              <p>Total value of all cryptocurrencies in wallet: {this.state.walletValue} Euro</p>
              <p>Earnings/Losses: {this.state.walletChange} Euro</p>
              <br/>

              <label>
                Select currency:
              </label>
              <select onChange={this.newCurr}>
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
              <p>Selected currency: {this.state.currentCurr}</p>
              <h3>Add new transaction</h3>
              <label> Amount </label>
              <br/>
              <label>A positive value if you're buying, negative if you're selling</label>
              <br/>
              <input id="transactionamount" type="text" onChange={this.newAmount}/>
              <br/><br/>
              <input type="button" value="Add transaction and update wallet" onClick={this.newTransaction}/>

              <br/><br/>
              <br/><br/>
              <br/><br/>


              <label> Cryptocurrency: </label>
              <input type="text" disabled value="123123"/>
              <br/><br/>
              <label> Current Amount: </label>
              <input type="text"/>
              <br/><br/>
              <label> Last Updated: </label>
              <br/><br/>
              <label> History of Purchases: </label>
              <br/><br/>
              <input type="button" value="Update Wallet to Current Value"/>
            </form>
          </div>
        </div>
      </div>
    )
  }
}

render(
  <Wallet/>,
  document.getElementById('wallet'));

if (module.hot) {
  module.hot.accept();
}