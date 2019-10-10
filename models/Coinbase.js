const { Schema, model } = require('mongoose')

const coinbaseSchema = new Schema({
  status: { type: String, required: true },
  _id: { type: String, required: true },
  code: { type: String, required: true },
  primaryPaymentValue: { 
    amount: String,
    currency: String
  },
  localPrimaryPaymentValue: {
    amount: String,
    currency: String
  }
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