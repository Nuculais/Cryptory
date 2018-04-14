import React from 'react';
import {render} from 'react-dom';
import {AppContainer} from 'react-hot-loader';

// import DefaultLayout from './layouts/default.jsx'

export default class Profile extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      user: this.props.user
    }
  }

  render() {
    console.log('profile props', this.state.user)
    return (
      <div>
        Profile
        <li>{this.state.user.name}</li>
        <li>{this.state.user.email}</li>
        <li>{this.state.user.created_at}</li>
     </div>
    )
  }
}
