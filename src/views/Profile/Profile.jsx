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
                        <img src={this.state.user.data.avatar}/>
                        <div className="navProfileText">
                            {this.state.user.data.name}
                            <br/>
                            <a href="/logout">Log out</a><br/><br/>
                        </div>
                    </div>;
                break;
        }

        return (
            <div className="pageLayout">
                <div className="navbar">
                    <div>
                        Cryptory
                    </div>
                    <div>
                        <h2>Your Following:</h2>
                        <CoinTable following={this.state.user.following}/>
                    </div>
                    {profile}
                </div>
                <div className="myWallet">
                    <h1>{this.state.title}</h1>
                    <br/>
                    <form>
                        <label>
                            Select Currency:
                        </label>
                        <select>
                            <option value="BTC">BTC</option>
                            <option value="ETH">ETH</option>
                        </select>
                        <br/>
                        <label> Cryptocurreny </label>
                        <input type="text" disabled value="123123" />
                    </form>
                </div>

            </div>
    );
    }
    }

    render(
        <MuiThemeProvider muiTheme={getMuiTheme(lightBaseTheme)}>
            <Profile/>
        </MuiThemeProvider>
    ,
    document.getElementById('profile'));

    if (module.hot) {
        module.hot.accept();
    }
