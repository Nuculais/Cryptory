const express = require('express');
const webpack = require('webpack');
const webpackDevMiddleware = require('webpack-dev-middleware');
const webpackHotMiddleware = require("webpack-hot-middleware");

// mongo
const User = require('./model/User')
const mongoose = require('mongoose')
mongoose.set('debug', true);
// const db = mongoose.connect('mongodb://mongo:27017');
const db = mongoose.connect('mongodb://127.0.0.1:27017/mydb');

// logging
mongoose.Promise = global.Promise;
mongoose.connection.on('error', console.error.bind(console, 'MongoDB connection error:'));

// webpack
const config = require('./webpack.config.js');
const compiler = webpack(config);

// passport
const passport = require('passport');
const githubStrategy = require('./server/github-signup')
passport.use(githubStrategy)

passport.serializeUser(function (user, cb) {
  console.error('serialize', cb)
  cb(null, user);
});
passport.deserializeUser(function (user, cb) {
  console.error('deserialize', user, cb)
  User.findById(user._id, function (err, user) {
    cb(null, user);
  });
});

// express
const app = express();

// Configure view engine to render EJS templates.
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');


app.use(require('morgan')('combined'));
app.use(require('cookie-parser')());
app.use(require('body-parser').urlencoded({extended: true}));
app.use(require('express-session')({secret: 'keyboard cat', resave: true, saveUninitialized: true}));
app.use(passport.initialize());
app.use(passport.session());

// Production
// app.set('views', __dirname + '/src');
// app.set('view engine', 'jsx');
// app.engine('jsx', require('express-react-views').createEngine());
// app.get('/', require('./routes').index);

// app.get('/profile/:id', function (req, res, next) {
//   if (!req.user || (req.user.id != req.params.id)) {
//     return next('Not found');
//   }
//   res.render('profile', {user: req.user.toJSON()});
// });

// Define routes.
app.get('/',
  function (req, res) {
    res.render('home', {user: req.user});
  });

app.get('/login',
  function (req, res) {
    res.render('login');
  });

app.get('/login/github',
  passport.authenticate('github'));

app.get('/login/github/return',
  passport.authenticate('github', {failureRedirect: '/login'}),
  function (req, res) {
    res.redirect('/');
  });

app.get('/profile',
  require('connect-ensure-login').ensureLoggedIn(),
  function (req, res) {
    res.render('profile', {user: req.user});
  })


// app.use('/dist', serveStatic(config.output.publicPath))
// //   .use('/static', serveStatic('static', __dirname + '/dist/static'));
// //
// app.get('*', (req, res) => {
//   res
//     .status(200)
//     .render('index', '/dist',
//     );
// });

// development
// Tell express to use the webpack-dev-middleware
app.use(webpackDevMiddleware(compiler, {
  publicPath: config.output.publicPath
}));

// hot reload
app.use(webpackHotMiddleware(compiler));


// Serve the files on port 3000.
app.listen(3000, function () {
  console.log('Example app listening on port 3000!\n');
});


