var React = require('react');
// import {AppContainer} from 'react-hot-loader';

class DefaultLayout extends React.Component {
  render() {
    return (
      <html>
      <head><title>{this.props.title}</title></head>
      <body>{this.props.children}</body>
      </html>
    );
  }
}

// module.hot.accept();
module.exports = DefaultLayout;