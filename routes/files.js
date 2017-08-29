const express = require('express');
const router = express.Router();

const path = require('path');
const filesystem = require('fs');

const moment = require('moment');
const User = require('../models/user');
const Listings = require('../models/listing');

const readable = require('../public/javascripts/tilly-requires/readable.js');

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
        humanize: readable.humanize
      });
    });
  } else {
    res.redirect('/');
  }
});

module.exports = router;
