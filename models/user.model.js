const mongoose = require('mongoose');

const Userschema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },

  email: {
    type: String,
    required: true,
    unique: true
  },
  hashedPassword: {
    type: String,
    required: true
  },
  mobileNumber: {
    type: String,
    required: true
  },
});

const Users = mongoose.model('users', Userschema);

module.exports = Users;