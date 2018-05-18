import React from 'react';
import {render} from 'react-dom';
import {AppContainer} from 'react-hot-loader';

class App extends React.Component {
  render() {
    return <p>React project</p>;
  }
}

render(
  <AppContainer>
    <App/>
  </AppContainer>,
  document.getElementById('app'));

module.hot.accept();
