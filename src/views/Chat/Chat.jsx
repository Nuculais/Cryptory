import React from 'react'
import {ListItem} from 'material-ui/List';
import Avatar from 'material-ui/Avatar';
import CommunicationChatBubble from 'material-ui/svg-icons/communication/chat-bubble';

export default class Chat extends React.Component {
  render() {
    return (
      <ListItem
        // primaryText={this.props.data.name}
        primaryText={'yes'}
        leftAvatar={<Avatar src="images/kolage-128.jpg"/>}
        rightIcon={<CommunicationChatBubble/>}
      >text</ListItem>
    )
  }
}