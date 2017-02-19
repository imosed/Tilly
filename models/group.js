var mongoose = require('mongoose');
var User = require('./user.js')

var groupSchema = mongoose.Schema({
  name: {
    type: String
  },
  level: {
    type: Number
  }
});

const Group = module.exports = mongoose.model('Group', groupSchema);

module.exports.createGroup = function(newGroup, callback) {
  Group.create(newGroup, callback);
}
