const express = require('express');
const router = express.Router();

const path = require('path');
const filesystem = require('fs');

const passport = require('passport');
const User = require('../models/user');
const Group = require('../models/group');

/* After form submission, add newly registered user to database */
router.post('/', function(req, res, next) {
  username = req.body.username;
  password = req.body.password;
  email = req.body.email;
  storage_limit = req.body.storage;
  join_date = new Date();

  req.checkBody('username', 'Username field cannot be empty.').notEmpty();
  req.checkBody('password', 'Password field cannot be empty.').notEmpty();
  req.checkBody('email', 'Email field seems to be formatted incorrectly.').isEmail();
  req.checkBody('storage', 'Storage limit should be a number.').isInt();

  let errs = req.validationErrors();

  if (errs) {
    res.render('register', {
      errs: errs
    });
  } else {
    Group.getObjByName('default', function(err, grp) {
      var newUser = new User({
        username: username,
        password: password,
        email: email,
        group: grp._id,
        storage_limit: storage_limit,
        join_date: join_date
      });
      filesystem.mkdir(path.resolve('storage/', (newUser._id).toString()), (err) => {
        if (err) res.send(err);
        User.registerUser(newUser, function(err, user) {
          if (err) throw err;
          res.redirect('/');
        });
      });
    });
  }
});

router.get('/', function(req, res, next) {
  res.render('register', {
    title: 'Nubes: Registration'
  });
});

module.exports = router;
