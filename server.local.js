const express = require('express');
const webpack = require('webpack');
const webpackDevMiddleware = require('webpack-dev-middleware');
const webpackHotMiddleware = require("webpack-hot-middleware");
const helmet = require('helmet');
const bodyParser = require('body-parser');
require('dotenv').config();
const fetch = require('node-fetch');

// mongo
const User = require('./model/User')
const Coin = require('./model/Coin')
const Chats = require('./model/Chats')
const mongoose = require('mongoose')
// const uri = `mongodb://${encodeURIComponent('cryptoryadmin')}:${encodeURIComponent('cryptory123456789')}@ds247569.mlab.com:47569/heroku_d783vzs7`
// const db = mongoose.connect(uri);
mongoose.connect('mongodb://localhost:27017/cryptory');
// const db = mongoose.connection
// logging
mongoose.set('debug', true);
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
  cb(null, user);
});
passport.deserializeUser(function (user, cb) {
  User.findById(user._id, function (err, user) {
    cb(null, user);
  });
});

// express
const app = express();

app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(bodyParser.json());

// Configure view engine to render EJS templates.
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');

app.use(helmet());
app.use(require('morgan')('combined'));
app.use(require('cookie-parser')('alcovewonderwhy99save'));
app.use(require('body-parser').urlencoded({extended: true}));
app.use(require('express-session')({
  secret: 'keyboardcatanalyze',
  resave: true,
  key: 'omaha',
  saveUninitialized: true,
  secure: true,
  proxy: true,
  maxAge: 54000000
}));
// app.use(bodyParser.json())
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
  },)

app.get('/profile',
  require('connect-ensure-login').ensureLoggedIn(),
  function (req, res) {
    res.render('profile', {user: req.user.username});
  });

app.get('/histogram',
  require('connect-ensure-login').ensureLoggedIn(),
  function (req, res) {
    res.render('histogram', {user: req.user.username});
  });


app.get('/wallet',
  require('connect-ensure-login').ensureLoggedIn(),
  function (req, res) {
    res.render('wallet', {user: req.user.username});
  });

app.get('/login/github',
  passport.authenticate('github'));

app.get('/login/github/return',
  passport.authenticate('github', {failureRedirect: '/login'}),
  function (req, res) {
    res.redirect('/profile');
  });

// app.get('/profile', function(req, res, next) {
//   if (!req.user || (req.user.id != req.params.id)) {
//     return next('Not found');
//   }
//   res.render('/profile');
// });
app.get('/api/user/:username', (req, res) => {
  require('connect-ensure-login').ensureLoggedIn(),
    User.findOne({username: JSON.parse(req.params.username)},
      function (err, obj) {
        if (err) {
          res.send(err);
          return;
        }
        console.log('api get user', obj)
        res.json(obj);
      });
});


// api = express.Router()


// app.post("/update", function (req, res) {
//   console.error("req", req.body)
//   require('connect-ensure-login').ensureLoggedIn(),
//     User.findOne(req.body.id, {name: req.body.name},
//       function (err) {
//         if (err) {
//           res.send(err);
//           return;
//         }
//         res.send({data: "Record has been Updated..!!"});
//       });
// })

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

app.put('/api/transactions/:user', async (req, res) => {
  let user, transactions
  try {
    user = JSON.parse(req.params.user)
    transactions = req.body.transactions
    const searchQuery = {
      username: user
    };
    const updates = {
      transactions: transactions
    };
    const options = {
      new: true
    }
    User.findOneAndUpdate(searchQuery, {$push: updates}, options, async (err, user) => {
      try {
        user.save()
        res.sendStatus(200)
      } catch (err) {
        res.status(422).json({message: 'error saving to database ' + err})
      }
    })
  } catch (error) {
    res.status(500).json({message: `format: ${error}`});
  }
})

app.put('/api/wallet/:user', async (req, res) => {
  let user, wallet
  try {
    user = JSON.parse(req.params.user)
    wallet = req.body.wallet
    const searchQuery = {
      username: user
    };
    const updates = {
      wallet: wallet
    };
    const options = {
      new: true
    }
    User.findOneAndUpdate(searchQuery, {$push: updates}, options, async (err, user) => {
      try {
        user.save()
        res.sendStatus(200)
      } catch (err) {
        res.status(422).json({message: 'error saving to database ' + err})
      }
    })
  } catch (error) {
    res.status(500).json({message: `format: ${error}`});
  }
})

app.get("/chats", (req, res) => {
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
    io.emit("RECEIVE_MESSAGE", req.params.msg)
  } catch (error) {
    res.status(500).json({message: `format: ${error}`});
  }
});


// const http = require("http");
// const socketIo = require("socket.io");
// const server = http.createServer(app);
//
// const io = socketIo(server);
// // Listen for a connection
// io.on('connection', socket => {
//   // Create message
//   socket.on('chat message', params => {
//     Chats.save(nfig, params, (message) => {
//       io.emit('chat message', message);
//     })
//   })
// })


// let interval;
// io.on('connection', socket => {
//   console.log('User connected. Socket id %s', socket.id);
//   if (interval) {
//     clearInterval(interval);
//   }
//   interval = setInterval(() => currencyAPI(socket), 5000);
//   socket.on("disconnect", () => {
//     console.log("Client disconnected");
//   });
// });
// const coinPort = 4002
// server.listen(coinPort, () => console.log(`Ticker listening on port ${coinPort}`));
// const currencyAPI = require('./server/currency_api')

// chat calls
// const io2 = socketIo(server);
// io2.on('connection', socket => {
//   console.log('User connected. Socket id', socket.id);
//   socket.on('chat', function (msg) {
//     socket.broadcast.emit('chat', msg);
//   });
//   socket.on("disconnect", () => {
//     console.log("Client disconnected");
//   });
// });

// const chatPort = 4002
// server.listen(chatPort, () => console.log(`Chatroom listening on port ${chatPort}`));

// development
// Tell express to use the webpack-dev-middleware
app.use(webpackDevMiddleware(compiler, {
  publicPath: config.output.publicPath
}));

// hot reload
app.use(webpackHotMiddleware(compiler));

const port = process.env.PORT || 3000

const server = app.listen(port, function () {
  console.log('Cryptory listening on port 3000!\n');
});


// Initialize socket.io
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


