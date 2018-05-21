import React from 'react';
import ActionFace from 'material-ui/svg-icons/action/face';
import ActionQuestionAnswer from 'material-ui/svg-icons/action/question-answer';
import EditorAttachMoney from 'material-ui/svg-icons/editor/attach-money';
import EditorMultilineChart from 'material-ui/svg-icons/editor/multiline-chart';
import RaisedButton from 'material-ui/RaisedButton';
import Avatar from 'material-ui/Avatar';
import Divider from 'material-ui/Divider';
import {connect} from 'react-redux'
import {actionCreators} from "../../cryptoryRedux";
import PropTypes from 'prop-types';
import {List, ListItem, makeSelectable} from 'material-ui/List';

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

const styles = {
  mediumIcon: {
    width: 48,
    height: 48,
  },
  medium: {
    width: 96,
    height: 96,
    padding: 24,
  },
};

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
                style={{margin: 5}}
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
        </SelectableList>
        <Divider/>
        <br/>
        <div style={{textAlign: 'center'}}>
          <RaisedButton href="/wallet" label="Wallet" style={styles}/>
        </div>
        <br/>
        <Divider/>
        <br/>
        <div style={{textAlign: 'center'}}>
          <RaisedButton href="/histogram" label="Histogram" style={styles}/>
        </div>
        <br/>
        <Divider/>
        <br/>
        <div style={{textAlign: 'center'}}>
          <RaisedButton href="/logout" label="LOG OUT" style={styles}/>
        </div>
        <br/>
        <Divider/>
      </div>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Sidebar)


