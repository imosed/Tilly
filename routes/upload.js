var express = require('express');
var router = express.Router();

const User = require('../models/user');
var Listing = require('../models/listing');

const path = require('path');
const multer = require('multer');
const storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, path.resolve('storage/', (req.user._id).toString()));
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
    upload(req, res, function(err) {
        var listing = new Listing();
        var dateUploaded = new Date();
        listing.display_name = req.file.originalname;
        listing.file_name = req.file.filename;
        listing.path = req.body.upldir;
        listing.extension = path.extname(req.file.originalname);
        listing.size = req.file.size;
        listing.owner = req.user._id;
        listing.obj_type = 'f';
        listing.date_added = dateUploaded;
        listing.shared = false;

        Listing.indexFile(listing, (e, listing) => {
            if (e) res.end(e);
        });
        if (err) return res.end("File could not be uploaded.");
        res.end('{' + jsonValue('display_name', req.file.originalname) +
            jsonValue('file_name', req.file.filename) +
            jsonValue('path', req.body.upldir) +
            jsonValue('extension', path.extname(req.file.originalname)) +
            jsonValue('size', req.file.size) +
            jsonValue('owner', req.user._id) +
            jsonValue('obj_type', 'f') +
            jsonValue('date_added', dateUploaded) +
            jsonValue('shared', false, true) + '}');
    });
});

function jsonValue(name, value, noComma) {
    return '"' + name + '": "' + value + '"' + (noComma ? '' : ', ');
}

module.exports = router;
