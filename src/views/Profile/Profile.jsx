import React from 'react';
import {Link} from 'react-router-dom';
import {render} from "react-dom";

// import DefaultLayout from './layouts/default.jsx'

class Profile extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      title: 'Cryptory Profile',
      status: 'INITIAL',
      user: ''
    };
  }

  loadData() {
    fetch(`api/user/${user.data}`).then(response => {
      if (response.ok) {
        response.json().then(data => {
          this.setState({
            status: 'LOADED',
            user: data
          });
        });
      } else {
        response.json().then(error => {
          alert("Failed to fetch issues:" + error.message)
        });
      }
    }).catch(err => {
      alert("Error in fetching data from server:", err);
    });
  }

  componentDidMount() {
    this.loadData()
  }

  render() {
    console.log('home props', this.props)
    let profile, graphs = ''
    switch (this.state.status) {
      case 'INITIAL':
        profile = <em>Loading...</em>
        graphs = <em>Loading...</em>
        break;
      case 'LOADED':
        profile =
          <div>
            <h3>Welcome, {this.state.user.data.name}!</h3>
            <img src={this.state.user.data.avatar}/>
          </div>
        graphs = this.state.user.data.following.map((currency) =>
          <li key={currency.id}>{currency}</li>
        );
        break;
    }
    {
      console.log(this.state)
    }

    return (
      <div>
        <h1>{this.state.title}</h1>
        {profile}
        <h2>Your Currencies:</h2>
        {graphs}
        <p><a href="/logout">log out</a></p>
      </div>
    );
  }
}

render(
  <Profile/>
  ,
  document.getElementById('profile'));
module.hot.accept();
