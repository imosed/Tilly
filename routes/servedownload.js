const express = require('express');
const router = express.Router();

const User = require('../models/user');
const Listing = require('../models/listing');

const path = require('path');
const fs = require('fs');

/* GET home page. */
router.get('/:file', function(req, res, next) {
  res.download(path.resolve('public/', 'user_content/', req.params.file));
});

module.exports = router;
