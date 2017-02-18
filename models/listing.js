var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var User = require('./user.js');

var listingSchema = mongoose.Schema({
    display_name: {
        type: String
    },
    file_name: {
        type: String
    },
    path: {
        type: String
    },
    extension: {
        type: String
    },
    size: {
        type: Number
    },
    owner: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    obj_type: {
        type: String
    },
    date_added: {
        type: Date,
        default: Date.now
    },
    shared: {
        type: Boolean,
        default: false
    }
});

const Listing = module.exports = mongoose.model('Listing', listingSchema);

module.exports.indexFile = function(newFile, callback) {
    Listing.create(newFile, callback);
}

module.exports.getFileStats = function(user, path, filename, callback) {
    Listing.findOne({owner: user._id, path: path, display_name: filename}, callback).populate('owner');
}

module.exports.getListingsForUser = function(user, navpath, callback) {
    const query = {
        owner: user._id,
        path: navpath
    };
    Listing.find(query, callback).sort([
        ['title', 'ascending']
    ]).populate('owner');
}

module.exports.createDirectory = function(newDir, callback) {
    Listing.create(newDir, callback);
}