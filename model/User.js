const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    default: ''},
  someId: {
    type: String,
    default: ''
  },
  username: {
    type: String,
    default: '',
    required: true,
    // unique: true
  },
  email: {
    type: String,
    default: '',
    required: true,
    // unique: true
  },
  password: {
    type: String,
  },
  created_at: {
    type: Date,
    default: Date.now
  },
  github: String,
  profile: {
    name: {type: String, default: ''},
    gender: {type: String, default: ''},
    location: {type: String, default: ''},
    website: {type: String, default: ''},
    picture: {type: String, default: ''}
  },
});

module.exports = mongoose.model('User', userSchema)

