import React from 'react';
import {Card, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card';
import RaisedButton from 'material-ui/RaisedButton';

export default class Welcome extends React.Component {
  render() {
    return (
      <Card>
        <CardHeader title={'CRYPTORY'}/>
        <CardMedia
          overlay={<CardTitle
            title={'Welcome!'}
          />}>
          <img src="https://i.imgur.com/s5krUs0.png" height="400" width="400" alt="Cryptory"/>
        </CardMedia>
        <CardText>
          Get ready to maintain your crypto transactions..
          <br/>
          <div style={{textAlign: 'center'}}>
            <RaisedButton href="login" label="LOG OUT"/>
          </div>
        </CardText>
      </Card>
    )
  }
}

