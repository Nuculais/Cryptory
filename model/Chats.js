const mongoose = require('mongoose');

const chatSchema = new mongoose.Schema({
  name: String,
  chat: String,
  date: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Chatroom', chatSchema)

