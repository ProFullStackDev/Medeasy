const { Schema, model } = require('mongoose')

const coinbaseSchema = new Schema({

})

coinbaseSchema.methods = {
  toJSON: function () {
    const coinbase = this.toObject()
    delete coinbase.__v
    return coinbase
  }
}

const Coinbase = model('coinbase', coinbaseSchema)
module.exports = Coinbase