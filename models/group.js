const mongoose = require('mongoose');
const User = require('./user.js')

const groupSchema = mongoose.Schema({
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

module.exports.getObjByName = function(groupName, callback) {
  Group.findOne({
    name: groupName
  }, callback);
}
