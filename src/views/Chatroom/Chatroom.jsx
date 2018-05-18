import React from 'react';
import {
  Table,
  TableBody,
  TableFooter,
  TableHeader,
  TableHeaderColumn,
  TableRow,
  TableRowColumn,
} from 'material-ui/Table';
import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card';
import TextField from 'material-ui/TextField';
import Toggle from 'material-ui/Toggle';
import RaisedButton from 'material-ui/RaisedButton'
import {connect} from 'react-redux'
import {actionCreators} from "../../cryptoryRedux";
import Progress from '../Progress/Progress'
import Avatar from 'material-ui/Avatar';
import {List, ListItem} from 'material-ui/List';
import Subheader from 'material-ui/Subheader';
import Divider from 'material-ui/Divider';
import CommunicationChatBubble from 'material-ui/svg-icons/communication/chat-bubble';
import socketIOClient from "socket.io-client";


const styles = {
  propContainer: {
    width: 200,
    overflow: 'hidden',
    margin: '20px auto 0',
  },
  propToggleHeader: {
    margin: '20px auto 10px',
  },
};

const mapStateToProps = (state) => ({
  profile: state,
  status: state.chatStatus,
  messages: state.messages,
  message: state.message,
  endpoint: state.endpointChat
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
  sendMessage: msg => {
    dispatch(actionCreators.sendMessage(msg))
  },
})

class Chatroom extends React.Component {
  componentDidMount() {
    console.log('chatroom props', this.props)
    this.props.loadChats()
    const endpoint = this.props.endpoint;
    const socket = socketIOClient(endpoint);
    socket.on("coins", data => {
      console.log('socket data', data)
      this.props.updateChats(data)
    })
  }

  render() {
    let chatHistory;
    console.log('messages', this.props.messages)
    switch (this.props.status) {
      case 'INITIAL':
        chatHistory = ''
        break;
      case 'LOADING':
        chatHistory = <Progress/>
        break
      case 'LOADED':
        chatHistory = this.props.messages.map(item => {
          return <ListItem
            id={new Date()}
            primaryText={`${item.name}:`}
            leftAvatar={<Avatar src="images/ok-128.jpg"/>}
            rightIcon={<CommunicationChatBubble/>}
          >
            {item.chat}
          </ListItem>
        })
        break
      default:
        chatHistory = <em>there was an error loading the profile</em>
    }
    console.log('chatroom props', this.props)
    return (
      <Card>
        <List>
          <Subheader>Recent chats</Subheader>
          {chatHistory}
        </List>
        <Divider/>
        <List>
          <Subheader>Previous chats</Subheader>
          <TableRow>
            <TableRowColumn colSpan="3" style={{textAlign: 'center'}}>
              <form onSubmit={this.props.send}>
                <TextField
                  onChange={e => {
                    this.props.setMessage(e.target.value)
                  }} onKeyPress={(e) => {
                  if (e.key === 'Enter') {
                    return this.props.search
                  }
                }}/>
              </form>
            </TableRowColumn>
            <TableRowColumn colSpan="3" style={{textAlign: 'center'}}>
              <RaisedButton
                onClick={this.props.search}
                // style={styles.checkbox}
              >{'Send'}</RaisedButton>
            </TableRowColumn>
          </TableRow>
        </List>
      </Card>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Chatroom)