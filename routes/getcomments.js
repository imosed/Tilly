const express = require('express');
const router = express.Router();

const User = require('../models/user');
const Listing = require('../models/listing');
const Comment = require('../models/comment');

const path = require('path');
const fs = require('fs');

/* Get comments for file */
router.get('/:path/:filename', (req, res, next) => {
  Listing.getFileStats(req.user, decodeURIComponent(req.params.path), decodeURIComponent(req.params.filename), (err, stats) => {
    if (err) res.send('Could not get file stats.');
    Comment.getCommentsForFile(stats._id, (e, comms) => {
      if (e) res.send('Could not get comments.');
      res.send(comms);
    })
  });
});

module.exports = router;
