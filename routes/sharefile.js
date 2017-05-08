const express = require('express');
const router = express.Router();

const Comment = require('../models/comment');
const Listing = require('../models/listing');

/* Set shared value to true */
router.get('/:path/:filename', (req, res, next) => {
  console.log(req.params.path);
  console.log(req.params.filename);
  Listing.shareFile(decodeURIComponent(req.params.path), decodeURIComponent(req.params.filename), (err) => {
    if (err) res.end(err);
    res.send('Success.');
  });
});

module.exports = router;
