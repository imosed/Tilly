var mongoose = require('mongoose');
var User = require('./user.js')

var groupSchema = mongoose.Schema({
  name: {
    type: String
  }
});
