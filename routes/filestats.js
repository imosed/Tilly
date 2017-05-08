const express = require('express');
const router = express.Router();

const User = require('../models/user');
const Listing = require('../models/listing');

const path = require('path');
const fs = require('fs');

/* Function to copy a file */
function cp(src, dst, callback) {
  src = src.toString();
  dst = dst.toString();
  var cbRan = false;
  var readSource = fs.createReadStream(src);
  readSource.on('error', (err) => {
    if (err) done(err);
  });

  var writeDest = fs.createWriteStream(dst);
  writeDest.on('error', (err) => {
    if (err) done(err);
  });
  writeDest.on('close', (ex) => {
    done();
  });

  readSource.pipe(writeDest);

  function done(err) {
    if (!cbRan) {
      callback(err);
      cbRan = true;
    }
  }
}

/* Get stats for file (size, owner, etc) */
router.get('/:path/:filename', (req, res, next) => {
  Listing.getFileStats(req.user, decodeURIComponent(req.params.path), decodeURIComponent(req.params.filename), (err, stats) => {
    if (err) res.send('Could not get file stats.');
    cp((path.resolve('storage/', (req.user._id).toString() + '/', stats.file_name)), (path.resolve('public/', 'user_content/', stats.display_name)), (e) => {
      if (e) res.send("Could not copy file.");
      else res.send(stats);
    });
  });
});

module.exports = router;
