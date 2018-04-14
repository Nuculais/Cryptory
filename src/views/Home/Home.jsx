import React from 'react';
import {render} from 'react-dom';
// import {AppContainer} from 'react-hot-loader';
import {Link} from 'react-router-dom';

// import DefaultLayout from './layouts/default.jsx'

export default class Home extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      user: this.props.user,
    };
  }

  render() {
    console.log('home props', this.state.user)
    // let curUser = JSON.parse(this.state.user);
    return (
      <div>
        Hello, {this.state.user.name}. View your <Link to="/profile">profile</Link>
      </div>
    );
  }
}

// render(
//   <Home>
//     <HelloMessage/>
//   </Home>,
//   document.getElementById('app'));
//
// module.hot.accept();
