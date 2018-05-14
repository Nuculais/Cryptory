const User = require('../model/User')
const Strategy = require('passport-github').Strategy;

//const GITHUB_CLIENT_ID = process.env.GITHUB_CLIENT_ID
//const GITHUB_CLIENT_SECRET = process.env.GITHUB_CLIENT_SECRET
//const url = process.env.GITHUB_CALLBACK_URL

LOCAL=true
const GITHUB_CLIENT_ID="05c9ea554088eb574e81";
const GITHUB_CLIENT_SECRET="4f20b014792a08ef802ddc8f7b511bd02947c60d";
const GITHUB_CALLBACK_URL="http://localhost:3000/login/github/return";


module.exports = new Strategy({
    clientID: GITHUB_CLIENT_ID,
    clientSecret: GITHUB_CLIENT_SECRET,
    //callbackURL: url
	callbackURL: GITHUB_CALLBACK_URL
  },
  function (accessToken, refreshToken, profile, done) {
    const searchQuery = {
      username: profile.username
    };
    const updates = {
      name: profile.displayName,
      username: profile.username,
      someId: profile.id,
      email: profile.username + '@github.com',
      avatar: profile.photos[0].value,
      following: ['BTC','ETH','ALT']
    };
    // update the User if s/he exists or add a new User
    User.findOneAndUpdate(searchQuery, updates, function (err, user) {
      if (err) {
        console.log(err);  // handle errors!
      }
      if (!err && user !== null) {
        done(null, user);
      } else {
        user = new User(updates);
        console.error('user to be inserted: ', user)
        user.save(function (err) {
          if (err) {
            console.log(err);  // handle errors!
          } else {
            console.log("saving user ...");
            done(null, user);
          }
        });
      }
    });
  });
