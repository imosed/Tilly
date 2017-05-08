const express = require('express');
const router = express.Router();

const User = require('../models/user');
const Listing = require('../models/listing');

const path = require('path');
const fs = require('fs');

/* Serve download to user */
router.get('/:file', (req, res, next) => {
  res.download(path.resolve('public/', 'user_content/', req.params.file));
});

module.exports = router;
