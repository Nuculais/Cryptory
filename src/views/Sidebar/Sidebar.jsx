import React from 'react';
import ContentInbox from 'material-ui/svg-icons/content/inbox';
import ActionGrade from 'material-ui/svg-icons/action/grade';
import ActionFace from 'material-ui/svg-icons/action/face';
import ActionQuestionAnswer from 'material-ui/svg-icons/action/question-answer';
import EditorAttachMoney from 'material-ui/svg-icons/editor/attach-money';
import EditorMultilineChart from 'material-ui/svg-icons/editor/multiline-chart';
import ContentSend from 'material-ui/svg-icons/content/send';
import ContentDrafts from 'material-ui/svg-icons/content/drafts';
import Avatar from 'material-ui/Avatar';
import Divider from 'material-ui/Divider';
import ActionInfo from 'material-ui/svg-icons/action/info';
import {connect} from 'react-redux'
import {actionCreators} from "../../cryptoryRedux";
import PropTypes from 'prop-types';
import {List, ListItem, makeSelectable} from 'material-ui/List';
import Subheader from 'material-ui/Subheader';

let SelectableList = makeSelectable(List);

function wrapState(ComposedComponent) {
  return class SelectableList extends React.Component {
    static propTypes = {
      children: PropTypes.node.isRequired,
      defaultValue: PropTypes.number.isRequired,
    };

    componentWillMount() {
      this.setState({
        selectedIndex: this.props.defaultValue,
      });
    }

    handleRequestChange = (event, index) => {
      event.preventDefault()
      let page = index
      this.setState({
        selectedIndex: page,
      });
      switch (index) {
        case 1:
          page = 'chatroom'
          break
        case 2:
          page = 'wallet'
          break
        case 3:
          page = 'histogram'
          break
        case 4:
          page = 'ticker'
          break
        default:
          page = 'profile'
          break
      }
      this.props.fn(page)
    };

    render() {
      return (
        <ComposedComponent
          value={this.state.selectedIndex}
          onChange={this.handleRequestChange}
        >
          {this.props.children}
        </ComposedComponent>
      );
    }
  };
}

SelectableList = wrapState(SelectableList);

const style = {margin: 5};

const mapDispatchToProps = (dispatch) => ({
  setPage: (val) => {
    dispatch(actionCreators.setPage(val))
  },
})

const mapStateToProps = (state) => ({
  page: state.page,
})

class Sidebar extends React.Component {
  render() {
    return (
      <div>
        <List>
          <ListItem
            disabled={true}
            leftAvatar={
              <Avatar
                src={this.props.avatar}
                size={40}
                style={style}
              />}
            primaryText={this.props.username}
          />
        </List>
        <Divider/>
        <SelectableList
          defaultValue={0}
          fn={this.props.setPage}
        >
          <ListItem
            value={0}
            primaryText="Profile"
            leftIcon={<ActionFace/>}
          />
          <ListItem
            value={1}
            primaryText="Chatroom"
            leftIcon={<ActionQuestionAnswer/>}
          />
          <ListItem
            value={2}
            primaryText="Wallet"
            leftIcon={<EditorAttachMoney/>}
          />
          <ListItem
            value={3}
            primaryText="Histogram"
            leftIcon={<EditorMultilineChart/>}
          />
        </SelectableList>
        <Divider/>
      </div>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Sidebar)


