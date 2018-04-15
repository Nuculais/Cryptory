const express = require('express');
const webpack = require('webpack');
const webpackDevMiddleware = require('webpack-dev-middleware');
const webpackHotMiddleware = require("webpack-hot-middleware");
const helmet = require('helmet');
const bodyParser = require('body-parser');
// const cors = require('cors')
// const users = require('./routes/users')


// mongo
const User = require('./model/User')
const mongoose = require('mongoose')
mongoose.set('debug', true);
const db = mongoose.connect('mongodb://mongo:27017/cryptory');
// mongoose.connect('mongodb://127.0.0.1:27017/cryptory');
// const db = mongoose.connection


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
  // console.error('serialize', cb)
  cb(null, user);
});
passport.deserializeUser(function (user, cb) {
  // console.error('deserialize', user, cb)
  User.findById(user._id, function (err, user) {
    cb(null, user);
  });
});

// express
const app = express();

// Configure view engine to render EJS templates.
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');


app.use(helmet());
app.use(require('morgan')('combined'));
app.use(require('cookie-parser')());
// app.use(require('body-parser').urlencoded({extended: true}));
app.use(require('express-session')({secret: 'keyboard cat', resave: true, saveUninitialized: true}));
app.use(bodyParser.json())
app.use(passport.initialize());
app.use(passport.session());

// Production
// app.set('views', __dirname + '/src/views');
// app.set('view engine', 'jsx');
// app.engine('jsx', require('express-react-views').createEngine());
// app.get('/', require('./routes').index);

// app.get('/profile/:id', function (req, res, next) {
//   if (!req.user || (req.user.id != req.params.id)) {
//     return next('Not found');
//   }
//   res.render('profile', {user: req.user.toJSON()});
// });

// app.use('/profile', users)

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
  function (req, res, next) {
    req.logout();
    res.end();
    res.redirect('/')
  },)

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

// app.get('/profile', function(req, res, next) {
//   if (!req.user || (req.user.id != req.params.id)) {
//     return next('Not found');
//   }
//   res.render('/profile');
// });


app.get('/home/:id',
  require('connect-ensure-login').ensureLoggedIn(),
  (req, res) => {
    console.log('here')
    let username;
    try {
      username = req.params.username
      console.error('username: ', username)
    } catch (error) {
      res.status(422).json({message: 'invalid username. ' + error})
      return;
    }
    // console.log('profile get', req)
    res.render('home', {user: req.user.id});
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


app.get('/api/user/:id', (req, res) => {
  require('connect-ensure-login').ensureLoggedIn(),
    // console.error('req', req.id)
  User.findOne(req.id,
    function (err, obj) {
      if (err) {
        res.send(err);
        return;
      }
      // res.json(res)
      res.json({data: obj});
    });
  // res.json(res)
  // db.collection('issues').find().toArray().then(issues => {
  //   const metadata = {total_count: issues.length};
  //   res.json({_metadata: metadata, records: issues})
  // }).catch(error => {
  //   console.log(error);
  //   res.status(500).json({message: `Internal Server Error: ${error}`});
  // });
});


// app.get('/api/profile', function(req, res) {
//   User.find({}).then(eachOne => {
//     res.json(eachOne);
//   })
// })

// app.post('profile',
//   require('connect-ensure-login').ensureLoggedIn(),
//   function (req, res) {
//     User.findByIdAndUpdate(req.user.id, {
//       $set: {
//         name: req.body.name,
//         address: req.body.address,
//         position: req.body.position,
//         salary: req.body.salary
//       }
//     }, {new: true}, function (err, employee) {
//       if (err) {
//         console.log(err);
//         res.render("../views/employees/edit", {employee: req.body});
//       }
//       res.redirect("/profile/" + employee._id);
//     })
//   }
// );


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


