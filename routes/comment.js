const express = require('express');
const router = express.Router();

const Comment = require('../models/comment');
const Listing = require('../models/listing');

/* Create a new comment */
router.post('/', (req, res, next) => {
  Listing.getIdByName(req.body.cfp, req.body.cfn, (err, fid) => {
    if (err) res.send(err);
    var newComm = new Comment();
    newComm.author = req.user._id;
    newComm.comm_body = req.body.ncb;
    newComm.for_file = fid;
    Comment.commentForFile(newComm, (e, comm) => {
      if (e) res.end(e);
      res.end('{' + jsonValue('author', req.user._id) +
        jsonValue('comm_body', req.body.ncb) +
        jsonValue('for_file', fid, true) + '}');
    });
  });
});

function jsonValue(name, value, noComma) {
  return '"' + name + '": "' + value + '"' + (noComma ? '' : ', ');
}

module.exports = router;
