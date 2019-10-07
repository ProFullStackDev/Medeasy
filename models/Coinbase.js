const { Schema, model } = require('mongoose')

const coinbaseSchema = new Schema({
  
})

const Coinbase = model('coinbase', coinbaseSchema)
module.exports = Coinbase