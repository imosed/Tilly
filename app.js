const express = require('express');
const path = require('path');
const favicon = require('serve-favicon');
const logger = require('morgan');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const compress = require('compression');
const session = require('express-session');
const expressValidator = require('express-validator');
const flash = require('connect-flash');
const passport = require('passport');
const LocalStrategy = require('passport-local');
const multer = require('multer');
const mongoose = require('mongoose');

const config = require('./config');

mongoose.connect('mongodb://localhost/' + config.dbname);
const db = mongoose.connection;

// Routes
const index = require('./routes/index');
const files = require('./routes/files');
const login = require('./routes/login');
const register = require('./routes/register');
const upload = require('./routes/upload');
const newDir = require('./routes/createdir');
const fileStats = require('./routes/filestats');
const serveDownload = require('./routes/servedownload');
const newComment = require('./routes/comment');
const getComments = require('./routes/getcomments');
// const listdir = require('./routes/listdir');
const users = require('./routes/users');

const app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: false
}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use(session({
  secret: config.secretkey,
  resave: true,
  saveUninitialized: true
}));

app.use(compress());

app.use(passport.initialize());
app.use(passport.session());

app.use(expressValidator({
  errorFormatter: function(param, msg, value) {
    const namespace = param.split('.');
    const root = namespace.shift();
    var formParam = root;

    while (namespace.length) {
      formParam += '[' + namespace.shift() + ']';
    }
    return {
      param: formParam,
      msg: msg,
      value: value
    };
  }
}));

app.use(require('connect-flash')());
app.use(function(req, res, next) {
  res.locals.messages = require('express-messages')(req, res);
  next();
})

// More routing stuff
app.use('/', index);
app.use('/files', files);
app.use('/login', login);
app.use('/register', register);
app.use('/upload', upload);
app.use('/createdir', newDir);
app.use('/filestats', fileStats);
app.use('/servedownload', serveDownload);
app.use('/comment', newComment);
app.use('/getcomments', getComments);
// app.use('/listdir', listdir);
app.use('/users', users);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
