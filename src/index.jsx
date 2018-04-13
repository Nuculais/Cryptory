import React from 'react';
import {render} from 'react-dom';
import {AppContainer} from 'react-hot-loader';
// import DefaultLayout from './layouts/default.jsx'

class HelloMessage extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      user: user.data,
    };
  }

  render() {
    let curUser = JSON.parse(this.state.user);
    console.log(curUser)
    return (
      <div>Hello test react {curUser.name} </div>
    );
  }
}

render(
  <AppContainer>
    <HelloMessage/>
  </AppContainer>,
  document.getElementById('app'));

module.hot.accept();
