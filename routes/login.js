const express = require('express');
const router = express.Router();

const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;

var User = require('../models/user');

/* GET home page. */

router.get('/', function(req, res) {
  res.redirect('/files');
});

passport.use(new LocalStrategy((username, password, done) => {
  User.getUserByUsername(username, (err, user) => {
    if (err) throw err;
    if (!user) return done(null, false);

    User.comparePassword(password, user.password, (err, isMatch) => {
      if (err) throw err;
      if (isMatch) return done(null, user);
      else return done(null, false);
    });
  });
}));

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser((id, done) => {
  User.getUserById(id, (err, user) => {
    done(err, user);
  });
});

router.post('/', (req, res, next) => {
  passport.authenticate('local', {
    successRedirect: '/files',
    failureRedirect: '/',
    failureFlash: false
  })(req, res, next);
});

module.exports = router;
