const mongoose = require('mongoose')

const transactionSchema = new mongoose.Schema({
  date: {
    type: Number,
    default: 0
    },
  cointype: {
      type: String,
      default: ''
  },
  amount: {
    type: Number,
    default: 0
},
    originalValue: {
        type: Number,
        default: 0
    }
});

module.exports = mongoose.model('Transaction', transactionSchema)