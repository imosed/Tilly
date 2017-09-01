const express = require('express');
const router = express.Router();

const User = require('../models/user');
const Listing = require('../models/listing');

const path = require('path');
const fs = require('fs');

/* Serve download to user */
router.get('/:fid', (req, res, next) => {
  Listing.getFileById(req.params.fid, (err, name) => {
    if (err) res.send(err);
    res.download(path.resolve('public/', 'user_content/', name.display_name));
  });
});

module.exports = router;
