import React from 'react';
import {Card} from 'material-ui/Card';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton'
import {connect} from 'react-redux'
import {actionCreators} from "../../cryptoryRedux";
import Progress from '../Progress/Progress'
import {List, ListItem} from 'material-ui/List';
import Subheader from 'material-ui/Subheader';
import Divider from 'material-ui/Divider';
import CommunicationChatBubble from 'material-ui/svg-icons/communication/chat-bubble';
import socketIOClient from "socket.io-client";
import {Row, Col} from 'react-flexbox-grid';

const styles = {
  propContainer: {
    width: 200,
    overflow: 'hidden',
    margin: '20px auto 0',
  },
  propToggleHeader: {
    margin: '20px auto 10px',
  },
  chatList: {
    height: 500,
    overflowY: 'auto',
  },
};

const mapStateToProps = (state) => ({
  username: state.username,
  messages: state.messages,
  status: state.chatStatus,
  endpoint: state.endpoint,
  message: state.message
})

const mapDispatchToProps = (dispatch) => ({
  loadChats: () => {
    dispatch(actionCreators.fetchChats())
  },
  updateChats: data => {
    dispatch(actionCreators.updateChats(data))
  },
  setMessage: msg => {
    dispatch(actionCreators.setMessage(msg))
  },
  sendChat: msg => {
    dispatch(actionCreators.sendChat(msg))
  },
  loadProfile: id => {
    dispatch(actionCreators.fetchUser(id))
  },
})
const adjustHeight = () => {
  const box = document.getElementById('chatlist')
  box.scrollTop = box.scrollHeight
}

class Chatroom extends React.Component {
  componentDidMount() {
    if (this.props.username) {
      this.props.loadProfile(localStorage.getItem('user'))
    }
    this.props.loadChats()
    const endpoint = this.props.endpoint;
    const socket = socketIOClient(endpoint);
    socket.on('RECEIVE_MESSAGE', function (data) {
      console.log('received message', data)
      this.props.addMessage(data)
      document.getElementById('chatlist') ? adjustHeight() : ''
    });
    document.getElementById('chatlist') ? adjustHeight() : ''
  }

  sendMessage = event => {
    event.preventDefault()
    const socket = socketIOClient(this.props.endpoint);
    const chat = {
      _id: Math.random(),
      name: this.props.name,
      chat: this.props.message,
      date: new Date().toString()
    }
    document.getElementById('chatform').reset()
    socket.emit("SEND_MESSAGE", chat)
    document.getElementById('chatlist') ? adjustHeight() : ''
    this.props.sendChat(chat)
  }

  render() {
    let chatHistory;
    switch (this.props.status) {
      case 'INITIAL':
        chatHistory = ''
        break;
      case 'LOADING':
        chatHistory = <div id={'chatlist'}><Progress/></div>
        break
      case 'LOADED':
        chatHistory =
          <Card>
            <List id={'chatlist'} style={styles.chatList}>
              <Subheader>Recent chats</Subheader>
              {this.props.messages.map(item => {
                return <div key={`${item._id}`}>
                  <Divider/>
                  <ListItem
                    primaryText={`${item.name}`}
                    leftAvatar={<CommunicationChatBubble/>}
                  >
                  </ListItem>
                  {`[${new Date(item.date).toLocaleString().split(',')[0]} - ${new Date(item.date).toLocaleString().split(',')[1]} ]:    ${item.chat}`}
                  <Divider/>
                </div>
              })}
            </List>
            {document.getElementById('chatlist') ? adjustHeight() : ''}
          </Card>
        break
      default:
        chatHistory = <em>there was an error loading the profile</em>
        break
    }

    return (
      <div>
        <Card style={{textAlign: 'center', height: "50px", marginTop: '25px', backgroundColor: 'rgb(200, 200, 200)'}}>
          <List>
            {'Cryptory Chat'}
            <br/>
            <em>Please be respectful!</em>
          </List>
        </Card>
        <Divider/>
        {chatHistory}
        {document.getElementById('chatlist') ? adjustHeight() : ''}
        <Divider/>
        <Row>
          <Col xs>
            <form id={'chatform'} onSubmit={this.sendMessage}>
              <TextField
                floatingLabelText={'Start Chatting!'}
                onChange={e => {
                  this.props.setMessage(e.target.value)
                }}
              />
            </form>
          </Col>
          <Col xs>
            <RaisedButton
              style={{marginTop: '25px'}}
              onClick={this.sendMessage}
            >{'Send'}</RaisedButton>
          </Col>
        </Row>
      </div>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Chatroom)