import React from 'react';
import Progress from '../Progress/Progress'
import Sidebar from '../Sidebar/Sidebar'
import CoinTable from '../Ticker/CoinTable'
import Chatroom from '../Chatroom/Chatroom'
import {connect} from 'react-redux'
import {actionCreators} from '../../cryptoryRedux.jsx'
import {Row, Col} from 'react-flexbox-grid';
import {RadioButton, RadioButtonGroup} from 'material-ui/RadioButton';
import RaisedButton from 'material-ui/RaisedButton';
import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card';
import FlatButton from 'material-ui/FlatButton';
import TextField from 'material-ui/TextField';
import Divider from 'material-ui/Divider';
import Paper from 'material-ui/Paper';
import socketIOClient from "socket.io-client";

const mapStateToProps = (state) => ({
  profile: state,
  name: state.user.name,
  endpoint: state.endpointChat,
  message: state.message,
  page: state.page,
  username: state.user.username
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

const adjustHeight = () => {
  const box = document.getElementById('chatlist')
  box.scrollTop = box.scrollHeight
}

class Profile extends React.Component {

  componentDidMount() {
    if (localStorage.getItem('user')) {
      this.props.loadProfile(localStorage.getItem('user'))
      this.props.restorePage(localStorage.getItem('page'))
    }
    if (!this.props.loginStatus) {
      this.props.loadProfile(user.data)
      localStorage.setItem('user', user.data)
    }
    console.log('passed port', user.port)
    let port = user.port
    console.log('port', port)
    console.log('port int', parseInt(port))
    console.log('port split', port.split('"'))
    this.props.setEndpoint('https://localhost:' + port)
  }

  render() {
    let profile;
    switch (this.props.profile.status) {
      case 'INITIAL':
        profile = <Progress/>
        break;
      case 'LOADED':
        profile =
          <Card>
            <CardHeader
            />
            <CardMedia
              overlay={<CardTitle
                title={this.props.profile.user.name ? `Hello, ${this.props.profile.user.name.split(' ')[0]}!` : 'Hello there!'}
                subtitle={`Member since: ${new Date(this.props.profile.user.created_at).toLocaleString().split(',')[0]}`}/>}
            >
              <img src={this.props.profile.user.avatar} alt=""/>
            </CardMedia>
            <CardText>
              At Cryptory, you can manage and keep track of your cryptocurrency holdings, check current prices, and even
              chat with other members! We also switch to a color scheme at night that's easier on your eyes. Enjoy!
            </CardText>
          </Card>
        break
      default:
        profile = <em>there was an error loading the profile</em>
        break
    }
    let page;
    switch (this.props.page) {
      case 'profile':
        page = this.props.profile.status === 'LOADED' ? profile : ''
        break;
      case 'chatroom':
        page = <Chatroom add={this.props.addMessage} name={this.props.username}>
          {document.getElementById('chatlist') ? adjustHeight() : ''}
        </Chatroom>
        break
      case 'histogram':
        page = <Card>'histogram'</Card>
        break
      default:
        break
    }
    return (
      <Row>
        <Row>
          <Col xs={12}>
            <div className="pageLayout">
              <Row start="xs">
                <Col xs={3}>
                  <Card>
                    <div className="navbar" style={{'height': '800px'}}>
                      <div>
                        <img src="https://i.imgur.com/s5krUs0.png" width="100%"
                             style={{marginTop: '20px', marginBottom: '20px'}}/>
                      </div>
                      <Divider/>
                      <div>
                        <Sidebar name={this.props.name} username={this.props.username}
                                 avatar={this.props.profile.user.avatar}/>
                      </div>
                      {/*{profile}*/}
                    </div>
                  </Card>
                </Col>
                <Col xs>
                  {page}
                  {document.getElementById('chatlist') ? adjustHeight() : ''}
                  {this.props.page === 'wallet' ?
                    <div className="myWallet">
                      {/*<h1 align="center">{this.state.title}</h1>*/}
                      <br/>
                      <form>
                        {/*<p>Total value of all cryptocurrencies in wallet: {this.state.walletValue} Euro</p>*/}
                        {/*<p>Earnings/Losses: {this.state.walletChange} Euro</p>*/}
                        <br/>

                        <label>
                          Select currency:
                        </label>
                        {/*<select onChange={this.props.selectCurrency}>*/}
                        {/*<option value='BTC'>Bitcoin</option>*/}
                        {/*<option value='ETH'>Ethereum</option>*/}
                        {/*<option value='DOGE'>Dogecoin</option>*/}
                        {/*<option value='XRP'>Ripple</option>*/}
                        {/*<option value='ADA'>Cardano</option>*/}
                        {/*<option value='TRX'>Tron</option>*/}
                        {/*<option value='XVG'>Verge</option>*/}
                        {/*<option value='LTC'>Litecoin</option>*/}
                        {/*<option value='EOS'>EOS</option>*/}
                        {/*<option value='NEO'>NEO</option>*/}
                        {/*</select>*/}
                        {/*<p>Selected currency: {this.props.currentCurr}</p>*/}
                        <h3>Add new transaction</h3>
                        <label> Amount </label>
                        <br/>
                        <label>A positive value if you're buying, negative if you're selling</label>
                        <br/>
                        {/*<input id="transactionamount" type="text" onChange={this.newAmount}/>*/}
                        <br/><br/>
                        {/*<input type="button" value="Add transaction and update wallet" onClick={this.newTransaction}/>*/}

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
