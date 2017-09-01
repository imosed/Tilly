const express = require('express');
const router = express.Router();

const User = require('../models/user');
const Listing = require('../models/listing');

const moment = require('moment');
const path = require('path');
const fs = require('fs');

const readable = require('../public/javascripts/tilly-requires/readable.js');

/* Serve download to user */
router.get('/:fid', (req, res, next) => {
  Listing.getFileById(req.params.fid, (err, file) => {
    if (file.shared) {
      req.flash('downloading', 'Downloading ' + file.display_name);
      res.render('landing', {
        title: 'Tilly: Landing - ' + file.display_name,
        messages: req.flash('downloading'),
        name: file.display_name,
        size: file.size,
        owner: file.owner.username,
        date: file.date_added,
        file: req.params.fid,
        moment: moment,
        humanize: readable.humanize
      });
    } else {
      res.send('File not found!')
    }
  });
});

module.exports = router;
