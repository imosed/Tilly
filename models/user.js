const mongoose = require('mongoose');
const bcrypt = require('bcrypt-nodejs');

const userSchema = mongoose.Schema({
  username: {
    type: String
  },
  password: {
    type: String
  },
  email: {
    type: String
  },
  group: {
    type: String
  },
  storage_limit: {
    type: Number,
    default: 20
  },
  join_date: {
    type: Date,
    default: Date.now
  }
});

const User = module.exports = mongoose.model('User', userSchema);

module.exports.registerUser = function(newUser, callback) {
  bcrypt.genSalt(10, (err, slt) => {
    bcrypt.hash(newUser.password, slt, null, (err, hash) => {
      if (err)
        return 'An error occurred: ' + err
      newUser.password = hash;
      newUser.save(callback);
    });
  });
}

module.exports.getUserByUsername = function(username, callback) {
  const query = {
    username: username
  };
  User.findOne(query, callback);
};

module.exports.getUserById = function(id, callback) {
  User.findById(id, callback);
};

module.exports.comparePassword = function(password, hash, callback) {
  bcrypt.compare(password, hash, function(err, isMatch) {
    if (err) throw err;
    callback(null, isMatch);
  })
};
