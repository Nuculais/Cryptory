import React from 'react';
import {render} from 'react-dom';
import {AppContainer} from 'react-hot-loader';

// class App extends React.Component {
//   render() {
//     return <p>React </p>;
//   }
// }

import DefaultLayout from './layouts/default.jsx'

class HelloMessage extends React.Component {
  constructor(props) {
    super(props)
    this.state = {user: user};
  }

  render() {
    console.log(this.state.user)
    // let test = JSON.parse(JSON.stringify(user))
    // console.log(user)
    // let user = JSON.stringify(user)
    return (
      <div>Hello react {this.state.user} </div>
    );
  }
}

render(
  <AppContainer>
    <HelloMessage/>
  </AppContainer>,
  document.getElementById('app'));

module.hot.accept();
