import React, {Component} from 'react';
import {render} from "react-dom";


const styles = {
  welcome: {
    textAlign: 'center',
    fontFamily: 'Roboto, sans-serif'
  }
}

class App extends Component {
  render() {
    return (
      <div style={styles.welcome}>
        <img src="https://i.imgur.com/s5krUs0.png" height="100%" width="400px" alt="Cryptory"/>
        <br/>
        <br/>
        <p>Get ready to maintain your crypto transactions..</p>
        <p>Please <a href={'/login/github'}>login</a> with GitHub!</p>
      </div>
    )
  }
}

render(
  <App/>,
  document.getElementById('app'));

if (module.hot) {
  module.hot.accept();
}