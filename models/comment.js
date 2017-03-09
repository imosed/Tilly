const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const Listing = require('./listing.js');
const User = require('./user.js');

const commentSchema = mongoose.Schema({
  author: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  },
  comm_body: {
    type: String
  },
  for_file: {
    type: Schema.Types.ObjectId,
    ref: 'Listing'
  }
});

const Comment = module.exports = mongoose.model('Comment', commentSchema);

module.exports.commentForFile = function(commObj, callback) {
  Comment.create(commObj, callback)
}

module.exports.getCommentsForFile = function(file, callback) {
  Comment.find({
    for_file: file
  }, callback).populate();
}
