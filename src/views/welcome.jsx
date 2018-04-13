import React from 'react';
import {render} from 'react-dom';
import {AppContainer} from 'react-hot-loader';
// import DefaultLayout from './layouts/default.jsx'

class Welcome extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
    };
  }

  render() {
    return (
      <div>Welcome React</div>
    );
  }
}

render(
  <AppContainer>
    <Welcome/>
  </AppContainer>,
  document.getElementById('welcome'));

module.hot.accept();
