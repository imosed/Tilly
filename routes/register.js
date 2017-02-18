var express = require('express');
var router = express.Router();

const path = require('path');
const filesystem = require('fs');

var passport = require('passport');
var User = require('../models/user');

/* GET home page. */
router.post('/', function(req, res, next) {
  username = req.body.username;
  password = req.body.password;
  email = req.body.email;
  group = 'default';  //req.body.group;
  storage_limit = req.body.storage;
  join_date = new Date();

  req.checkBody('username', 'Username field cannot be empty.').notEmpty();
  req.checkBody('password', 'Password field cannot be empty.').notEmpty();
  req.checkBody('email', 'Email field seems to be formatted incorrectly.').isEmail();
  req.checkBody('storage', 'Storage limit should be a number.').isInt();

  let errs = req.validationErrors();

  if (errs) {
    res.render('register', {errs: errs});
  } else {
    var newUser = new User({
      username: username,
      password: password,
      email: email,
      group: group,
      storage_limit: storage_limit,
      join_date: join_date
    });
    filesystem.mkdir(path.resolve('storage/', newUser._id + ''), (err) => {
      if(err) console.log(err);
    });
    User.registerUser(newUser, function(err, user){
      if(err) throw err;
      res.redirect('/');
    });
  }
});

router.get('/', function(req, res, next) {
  res.render('register', {title: 'Nubes: Registration'});
});

module.exports = router;