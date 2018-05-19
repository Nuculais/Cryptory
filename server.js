const express = require('express');
const helmet = require('helmet');

// mongo
const mongoose = require('mongoose');
const User = require('./model/User');
const Chats = require('./model/Chats')

mongoose.set('debug', true);
const uri = `mongodb://${encodeURIComponent('cryptoryadmin')}:${encodeURIComponent('cryptory123456789')}@ds247569.mlab.com:47569/heroku_d783vzs7`
mongoose.connect(uri);
// logging
mongoose.Promise = global.Promise;
mongoose.connection.on('error', console.error.bind(console, 'MongoDB connection error:'));


// passport
const passport = require('passport');
const githubStrategy = require('./server/github-signup');
passport.use(githubStrategy);
passport.serializeUser(function (user, cb) {
  cb(null, user);
});
passport.deserializeUser(function (user, cb) {
  User.findById(user._id, function (err, user) {
    cb(null, user);
  });
});

// express
const app = express();
// Configure view engine to render EJS templates.
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');
app.use(express.static('dist'));
app.use(helmet());
app.use(require('morgan')('combined'));
app.use(require('cookie-parser')());
app.use(require('express-session')({secret: 'keyboard cat', resave: true, saveUninitialized: true}));
app.use(require('body-parser').urlencoded({extended: true}));
app.use(passport.initialize());
app.use(passport.session());

// Define routes.
app.get('/',
  function (req, res) {
    if (!req.user) {
      res.render('home');
    } else {
      res.redirect('profile')
    }
  });

app.get('/login',
  function (req, res) {
    res.render('home');
  });

app.get('/logout',
  function (req, res) {
    req.logout();
    res.redirect('/')
  });

app.get('/profile',
  require('connect-ensure-login').ensureLoggedIn(),
  function (req, res) {
    res.render('profile', {user: req.user.username});
  });

app.get('/login/github',
  passport.authenticate('github'));

app.get('/login/github/return',
  passport.authenticate('github', {failureRedirect: '/login'}),
  function (req, res) {
    res.redirect('/profile');
  });

app.get('/home/:id',
  require('connect-ensure-login').ensureLoggedIn(),
  (req, res) => {
    let username;
    try {
      username = req.params.username
      console.error('username: ', username)
    } catch (error) {
      res.status(422).json({message: 'invalid username. ' + error})
      return;
    }
    res.render('home', {user: req.user.id});
  });

app.get('/api/user/:username', (req, res) => {
  require('connect-ensure-login').ensureLoggedIn(),
    User.findOne({username: JSON.parse(req.params.username)},
      function (err, obj) {
        if (err) {
          res.send(err);
          return;
        }
        res.json(obj);
      });
});

app.get('/chats', (req, res) => {
  Chats.find({}, (error, chats) => {
    if (error) {
      res.send(error)
    }
    else {
      res.send(chats)
    }
  }).sort({'date': -1}).limit(7)
})

app.put('/chats/:usr/:msg', async (req, res) => {
  let chat;
  try {
    chat = new Chats({name: req.params.usr, chat: req.params.msg});
    chat.save()
    res.sendStatus(200)
    io.emit("chat", req.params.msg)
  } catch (error) {
    res.status(500).json({message: `format: ${error}`});
  }
});

const port = process.env.PORT || 3000

// Serve the files on port 3000.
const server = app.listen(port, function () {
  console.log('Example app listening on port 3000!\n');
});


const io = require('socket.io').listen(server);

io.on('connection', socket => {
  console.log('User connected. Socket id', socket.id);
  socket.on('SEND_MESSAGE', function (data) {
    io.emit('RECEIVE_MESSAGE', data);
  })
  socket.on("disconnect", () => {
    console.log("Client disconnected");
  });
});
