import React from 'react';
import {Link} from 'react-router-dom';
import {render} from "react-dom";
import Progress from '../Progress/Progress'
// import WatchCoin from '../Ticker/WatchCoin'
import CoinTable from '../Ticker/CoinTable'
// import feed from '../../feed-socket.io'
import socketIOClient from "socket.io-client";
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import lightBaseTheme from 'material-ui/styles/baseThemes/lightBaseTheme';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import './Profile.css'


class Profile extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            title: 'My Wallet',
            status_prof: 'INITIAL',
            status_ticker: 'INITIAL',
            user: '',
        }
    }

    // TODO: pull user preferences into
    loadProfileData = () => {
        console.log('props', user.data)
        fetch(`api/user/${user.data}`).then(response => {
            if (response.ok) {
                response.json().then(data => {
                    this.setState({
                        status_prof: 'LOADED',
                        user: data
                    });
                });
            } else {
                response.json().then(error => {
                    alert("Failed to fetch issues:" + error.message)
                });
            }
        }).catch(err => {
            alert("Error in fetching user data from server:", err);
        });
    };

    componentDidMount = () => {
        this.loadProfileData()
    }

    render() {
        let profile;
        switch (this.state.status_prof) {
            case 'INITIAL':
                profile = <Progress/>
                break;
            case 'LOADED':
                profile =
                    <div className="navProfile">
                        <div className="navProfileText">
                            {this.state.user.data.name}
                            <br />
                            <a href="/logout">Log out</a>
                        </div>
                        <img src={this.state.user.data.avatar} />
                    </div>
                break;
        }

        return (
            <div className="pageLayout">
                <div className="navbar">
                    <div>
                        Cryptory
                    </div>
                    <div>
                        {this.state.title}
                    </div>
                    {profile}
                </div>
                <div>
                    <h1>{this.state.title}</h1>
                    <h2>Your Following:</h2>
                    <br/>
                    <CoinTable following={this.state.user.following}/>
                    <p></p>
                </div>
            </div>
        );
    }
}

render(
    <MuiThemeProvider muiTheme={getMuiTheme(lightBaseTheme)}>
        <Profile/>
    </MuiThemeProvider>,
    document.getElementById('profile'));

if (module.hot) {
    module.hot.accept();
}
