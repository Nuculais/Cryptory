import React from 'react';
import CircularProgress from 'material-ui/CircularProgress';

export default class Progress extends React.Component {
  render() {
    return (
      <CircularProgress size={80} thickness={5}/>
    );
  }
}
