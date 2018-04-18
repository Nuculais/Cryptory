// const User = require('requiremongoose').model('User')
const User = require('../model/User')
const Strategy = require('passport-github').Strategy;

const GITHUB_CLIENT_ID = '0f70e94a63215b10bb9e'
const GITHUB_CLIENT_SECRET = 'c4dec1f6544b2af7c2335d836244e080fc02deaa'

module.exports = new Strategy({
    clientID: GITHUB_CLIENT_ID,
    clientSecret: GITHUB_CLIENT_SECRET,
    callbackURL: 'https://murmuring-sea-20139.herokuapp.com/login/github/return'
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
