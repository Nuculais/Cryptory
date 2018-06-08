const mongoose = require('mongoose')

const currencySchema = new mongoose.Schema({
  cointype: {
    type: String,
    default: ''},
  amount: {
    type: Number,
    default: 0
}
});

module.exports = mongoose.model('Currency', currencySchema)