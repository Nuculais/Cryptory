import React from 'react';
import {Link} from 'react-router-dom';

// import DefaultLayout from './layouts/default.jsx'

export default class Home extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      status: 'INITIAL',
      user: ''
    };
  }

  loadData () {
    fetch(`api/user/${this.props.data.username}`).then(response => {
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

  componentDidMount () {
    this.loadData()
  }

  render() {
    console.log('home props', this.props)
    let profile = ''
    switch(this.state.status) {
      case 'INITIAL':
        profile: <em>Loading...</em>
        break;
      case 'LOADED':
        profile =
          <div>
            <li>{this.state.user.data.name}</li>
            {/*<li>{this.state.user.data.email}</li>*/}
            <li>{this.state.user.data.username}</li>
          </div>
        break;
    }
      {console.log(this.state)}

    return (
     <div>
        <h1>PROFILE</h1>
        {profile}
      </div>
    );
  }
}

// render(
//   <Home>
//     <HelloMessage/>
//   </Home>,
//   document.getElementById('app'));
//
// module.hot.accept();
