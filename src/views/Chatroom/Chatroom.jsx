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
  chat: {
    color: 'green'
  }

};

const mapStateToProps = (state) => ({
  messages: state.messages,
  status: state.chatStatus,
  endpoint: state.endpoint,
  message: state.message,
  username: state.user.username
})

const mapDispatchToProps = (dispatch) => ({
  loadChats: () => {
    dispatch(actionCreators.fetchChats())
  },
  setMessage: msg => {
    dispatch(actionCreators.setMessage(msg))
  },
  sendChat: msg => {
    dispatch(actionCreators.sendChat(msg))
  },
  addMessage: msg => {
    dispatch(actionCreators.addMessage(msg))
  },
})

class Chatroom extends React.Component {
  constructor(props) {
    super(props)
    this.fetchChat = this.fetchChat.bind(this);
    this.adjustHeight = this.adjustHeight.bind(this);
  }


  componentDidMount() {
    const endpoint = this.props.endpoint;
    const socket = socketIOClient(endpoint);
    socket.on('RECEIVE_MESSAGE', this.props.addMessage, function (data) {
      this.fetchChat(data)
    });
    this.props.loadChats()
  }

  componentDidUpdate() {
    if (document.getElementById('chatlist'))
      this.adjustHeight()
  }

  fetchChat = data => {
    this.props.addMessage(data)
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
    this.props.sendChat(chat)
  }

  adjustHeight = () => {
    const box = document.getElementById('chatlist')
    box.scrollTop = box.scrollHeight
  }

  render() {
    let chatHistory;
    switch (this.props.status) {
      case 'INITIAL':
        chatHistory = ''
        break;
      case 'LOADING':
        chatHistory = <div><Progress/></div>
        break
      case 'LOADED':
        chatHistory =
          <Card>
            <List id={'chatlist'} style={styles.chatList}>
              <Subheader>Recent chats</Subheader>
              {this.props.messages.map(item => {
                return <div key={`${item._id}`}>
                  <Divider/>
                  <ListItem style={item.name === this.props.name ? {color: 'green'} : {color: 'black'}}
                            primaryText={`${item.name} on ${new Date(item.date).toLocaleString().split(',')[0]} at ${new Date(item.date).toLocaleString().split(',')[1]}`}
                            leftAvatar={<CommunicationChatBubble/>}
                  >
                  </ListItem>
                  <div style={{marginLeft: '20px', marginBottom: '10px', marginRight: '25x'}}>
                    <div style={item.name === this.props.name ? {textAlign: 'right'} : {textAlign: 'left'}}>
                      {`${item.chat}`}
                    </div>
                  </div>
                  <Divider/>
                </div>
              })}
            </List>
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