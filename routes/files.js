var express = require('express');
var router = express.Router();

const path = require('path');
const filesystem = require('fs');

const moment = require('moment');
const User = require('../models/user');
const Listings = require('../models/listing');

/* Function for rounding file sizes */
function preciseRound(n) {
  var f = 0;
  if (n < 10) f = 1000;
  else if (n < 100) f = 100;
  else f = 10;
  n *= f;
  n = Math.round(n);
  n /= f;
  return n;
}

/* Render directory view for user */
router.get('/:navpath*?', (req, res, next) => {
  if (req.user) {
    var navPath = (req.params.navpath || '');
    var homeDir = navPath.length > 0;
    var navPath = '/home/' + req.user.username + '/' + navPath;
    const index = Listings.getListingsForUser(req.user, navPath, (err, files) => {
      if (err) res.send(err);
      req.flash('login', 'Welcome, ' + req.user.username + '!');
      res.render('files', {
        title: 'Tilly: Files',
        user: req.user,
        messages: req.flash('login'),
        moment: moment,
        navpath: navPath,
        homedir: homeDir,
        files: files,
        preciseRound: preciseRound
      });
    });
  } else {
    res.redirect('/');
  }
});

module.exports = router;
