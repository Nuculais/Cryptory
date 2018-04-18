//This is the view displaying histograms etc.
import React, { Component } from 'react';
import './histogram.css';
import {modelInstance} from '../data/APIetcModel';
//import the other user data somehow

class histogram extends Component {
    constructor(props) {
      super(props);
      this.state = {
        status: 'INITIAL',
      }
    }
  
  componentDidMount=()=> {
    this.props.model.addObserver(this)

  }
  
  componentWillUnmount(){
    this.props.model.removeObserver(this)
  }
  
  update(){
    this.setState({

    })
  }
}
