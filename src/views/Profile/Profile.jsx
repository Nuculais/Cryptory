import React from 'react';
import Progress from '../Progress/Progress'
import Sidebar from '../Sidebar/Sidebar'
import CoinTable from '../Ticker/CoinTable'
import Chatroom from '../Chatroom/Chatroom'
import {connect} from 'react-redux'
import {actionCreators} from '../../cryptoryRedux.jsx'
import {Grid, Row, Col} from 'react-flexbox-grid';
import {RadioButton, RadioButtonGroup} from 'material-ui/RadioButton';
import RaisedButton from 'material-ui/RaisedButton';
import {Card} from 'material-ui/Card'
import TextField from 'material-ui/TextField';
import Divider from 'material-ui/Divider';
import Paper from 'material-ui/Paper';
import Checkbox from 'material-ui/Checkbox';
import socketIOClient from "socket.io-client";

const mapStateToProps = (state) => ({
  profile: state,
  name: state.user.name,
  endpoint: state.endpointChat,
  message: state.message
})

const mapDispatchToProps = (dispatch) => ({
  loadProfile: id => {
    dispatch(actionCreators.fetchUser(id))
  },
  sendMessage: (usr, msg, avatar) => {
    dispatch(actionCreators.sendMessage(usr, msg, avatar))
  },
})

class Profile extends React.Component {

  componentDidMount() {
    if (localStorage.getItem('user')) {
      this.props.loadProfile(localStorage.getItem('user'))
    }
    if (!this.props.loginStatus) {
      this.props.loadProfile(user.data)
      localStorage.setItem('user', user.data)
    }
  }

  sendMessage = event => {
    event.preventDefault()
    console.log('handle send props', event)
    const socket = socketIOClient(this.props.endpoint);
    socket.emit("chat", this.props.message)
    const avatar = this.props.profile.user.avatar.replace(/(^\w+:|^)\/\//, '');
    this.props.sendMessage(this.props.username, this.props.message, avatar)
  }

  render() {
    let profile;
    switch (this.props.profile.status) {
      case 'INITIAL':
        profile = <Progress/>
        break;
      case 'LOADED':
        profile =
          <div>
            <h3>Welcome, {this.props.profile.user.name}!</h3>
            <img src={this.props.profile.user.avatar}/>
          </div>
        break
      default:
        profile = <em>there was an error loading the profile</em>
    }
    return (
      <div>
        <Sidebar/>
        {profile}
        <h2>Your Following:</h2>
        <br/>
        <Chatroom send={this.sendMessage}/>
        {/*<CoinTable following={this.props.profile.user.following}/>*/}
        <p><a href="/logout">log out</a></p>
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Profile)
