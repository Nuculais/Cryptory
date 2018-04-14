import React from 'react';
// import {render} from 'react-dom';
// import {AppContainer} from 'react-hot-loader';

// import DefaultLayout from './layouts/default.jsx'


export default class Welcome extends React.Component {
  render() {
    return (
      <div>Welcome please<a href="/login/github">login</a></div>
    )
  }
}


// render(
// <AppContainer>
// <Welcome/>
// </AppContainer>,
// document.getElementById('welcome'));
//
// module.hot.accept();
