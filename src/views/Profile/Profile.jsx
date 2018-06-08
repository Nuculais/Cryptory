import React from 'react';
import Progress from '../Progress/Progress'
import Sidebar from '../Sidebar/Sidebar'
import Histogram from '../Histogram/Histogram'
import Chatroom from '../Chatroom/Chatroom'
import {connect} from 'react-redux'
import {actionCreators} from '../../cryptoryRedux.jsx'
import {Row, Col} from 'react-flexbox-grid';
import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card';
import Divider from 'material-ui/Divider';
import {modelInstance} from "../../data/APIetcModel";

const mapStateToProps = (state) => ({
  profile: state,
  name: state.user.name,
  endpoint: state.endpointChat,
  message: state.message,
  page: state.page,
  username: state.user.username,
  status: state.status
})

const mapDispatchToProps = (dispatch) => ({
  loadProfile: id => {
    dispatch(actionCreators.fetchUser(id))
  },
  loadChats: () => {
    dispatch(actionCreators.fetchChats())
  },
  updateChats: data => {
    dispatch(actionCreators.updateChats(data))
  },
  restorePage: page => {
    dispatch(actionCreators.setPage(page))
  },
  setChatStatus: status => {
    dispatch(actionCreators.setChatStatus(status))
  },
  setEndpoint: url => {
    dispatch(actionCreators.setEndpoint(url))
  },
})

const styles = {
  image: {
    height: '100%',
    width: '100%',
  }
}


class Profile extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      title: 'Cryptory Wallet',
      currentCurr: 'BTC',
      walletValue: 0, //Total value of everything in the wallet
      walletChange: 0, //The total earn/loss
    }
    this.newTransaction = this.newTransaction.bind(this);
  }

  componentDidMount() {
    this.props.loadProfile(user.data)
  }

  newCurr(e) {
    modelInstance.setCurrentCurr(e.target.value);
    this.setState({currentCurr: e.target.value});
  };

  newAmount(e) {
    this.setState({transactionamount: e.target.value});
  };

  newTransaction() {
    modelInstance.makeNewTransaction(this.state.transactionamount);
  };

  walletUpdate() {
    this.setState({
      walletValue: modelInstance.getCurrentWalletValue(),
      walletChange: modelInstance.getComparison()
    });
  };

  update() {
    this.setState({
      currentCurr: modelInstance.getCurrentCurr(),
      walletValue: modelInstance.getWallet(),
      walletChange: modelInstance.getComparison()
    });
  }

  render() {
    let profile, chatroom, histogram
    switch (this.props.status) {
      case 'INITIAL':
        profile = <Progress/>
        chatroom = <Progress/>
        histogram = <Progress/>
        break;
      case 'LOADED':
        profile =
          <Card style={{height: "50px", marginTop: '25px', backgroundColor: 'rgb(200, 200, 200)'}}>
            <CardHeader title={'Profile'}/>
            <CardMedia
              overlay={<CardTitle
                title={this.props.profile.user.name ? `Hello, ${this.props.profile.user.name.split(' ')[0]}!` : 'Hello there!'}
                subtitle={`Member since: ${new Date(this.props.profile.user.created_at).toLocaleString().split(',')[0]}`}/>}
            >
              <img src={this.props.profile.user.avatar} height="100%" width="200" alt=""/>
            </CardMedia>
            <CardText>
              At Cryptory, you can manage and keep track of your cryptocurrency holdings, check current prices, and even
              chat with other members! We also switch to a color scheme at night that's easier on your eyes. Enjoy!
            </CardText>
          </Card>
        chatroom = <Chatroom
          name={this.props.username}
        />
        histogram = <Histogram/>
        break
      default:
        profile = <em>there was an error loading the profile. please refresh the page!</em>
        chatroom = <em>there was an error loading the chatroom. please refresh the page!</em>
        chatroom = <em>there was an error loading the histogram. please refresh the page!</em>
        break
    }
    let page;
    switch (this.props.page) {
      case 'profile':
        page = profile
        break;
      case 'chatroom':
        page = chatroom
        break
      case 'histogram':
        page = histogram
        break
      default:
        break
    }
    return (
      <Row>
        <Row>
          <Col xs={12}>
            <div className="pageLayout">
              <Row>
                <Col xs={3}>
                  <Card>
                    <div className="navbar" style={{'height': '800px'}}>
                      <div>
                        <img src="https://i.imgur.com/s5krUs0.png"
                          // style={{marginTop: '20px', marginBottom: '20px'}}/>
                             style={styles.image}/>

                      </div>
                      <Divider/>
                      <div>
                        <Sidebar name={this.props.name} username={this.props.username}
                                 avatar={this.props.profile.user.avatar}/>
                      </div>
                    </div>
                  </Card>
                </Col>
                <Col xs={6}>
                  {page}
                  {this.props.page === 'wallet' ?
                    <Card style={{height: "50px", marginTop: '25px', backgroundColor: 'rgb(200, 200, 200)'}}>
                      <CardHeader title={'Wallet'}/>
                      <div className="myWallet">
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
                    </Card>
                    : ''}
                </Col>
              </Row>
            </div>
          </Col>
        </Row>
      </Row>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Profile)
