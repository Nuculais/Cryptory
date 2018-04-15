import React from 'react';
import {render} from 'react-dom';
import {AppContainer} from 'react-hot-loader';

// import DefaultLayout from './layouts/default.jsx'

export default class Profile extends React.Component {
  constructor(props) {
    super(props)

  }


  handleSubmit(user) {
    fetch(`api/user/:${user}`).then(response => {
      if (response.ok) {
        response.json().then(data => {
          console.log(data)
          // console.log("Total count of records:", data._metadata.total_count);
          // data.records.forEach(issue => {
          //   issue.created = new Date(issue.created);
          //   if (issue.completionDate)
          //     issue.completionDate = new Date(issue.completionDate);
          // });
          // this.setState({issues: data.records});
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


  // handleSubmit(event) {
  //   let data = 'longsgtringasdfasdfasdfdsafasdfasfsad'
  //   // console.log(data)
  //   event.preventDefault();
  //   // let headers = new Headers();
  //   // headers.append('Content-Type', 'application/json');
  //   // return this.http.post('/update',data,
  //   //   {headers:headers})
  //   //   .map(res => res.json());
  //   fetch('/update', {
  //     method: 'post',
  //     headers: {
  //       // 'Accept': 'application/json',
  //       'Content-Type': 'application/json'
  //     },
  //     body: JSON.stringify(data)
  //   }).catch(e => console.log(e))
  //   ;
  // }
  // ;

  render() {
    // let user = this.props.match.username
    console.log('profile props', this.props)
   return (
      <div>
        {/*prop params id: {this.props}*/}
        {/*<button onClick={this.handleSubmit(user)}>test</button>*/}
        Profile
        {/*<li>{this.state.user.name}</li>*/}
        {/*<li>{this.state.user.email}</li>*/}
        {/*<li>{this.state.user.created_at}</li>*/}
      </div>
    )
  }
}
