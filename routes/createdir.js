var express = require('express');
var router = express.Router();

const User = require('../models/user');
const Listing = require('../models/listing');

const path = require('path');
const multer = require('multer');
const storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, path.resolve('storage'));
    },
    filename: function(req, file, cb) {
        cb(null, file.fieldname + '-' + Date.now());
    }
});
const upload = multer({
    storage: storage
}).single('uplbox');

/* GET home page. */
router.post('/', function(req, res, next) {
    var listing = new Listing();
    var dateCreated = new Date();
    listing.display_name = req.body.dirname;
    listing.file_name = req.body.dirname;
    listing.path = req.body.createin;
    listing.ext = null;
    listing.size = 0;
    listing.owner = req.user._id;
    listing.obj_type = 'd';
    listing.date_added = dateCreated;
    listing.shared = false;

    Listing.indexFile(listing, (e, listing) => {
        if (e) res.end(e);
    });
    if (err) return res.end("Directory could not be created.");
    res.end(resp);
});

module.exports = router;
