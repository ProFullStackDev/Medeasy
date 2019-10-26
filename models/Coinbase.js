const { Schema, model } = require('mongoose')

const coinbaseSchema = new Schema({
  // event.data.id
  coinbaseId: { type: String, required: true },
  // event.data.payments[0].status
  status: { type: String, required: true },
  // event.data.code
  code: { type: String, required: true },
  // event.data.payments[0].value.crypto
  primaryPaymentValue: {
    amount: String,
    currency: String
  },
  // event.data.payments[0].value.local
  localPrimaryPaymentValue: {
    amount: String,
    currency: String
  }
}, { timestamps: true })

coinbaseSchema.methods = {
  toJSON: function () {
    const coinbase = this.toObject()
    delete coinbase.__v
    return coinbase
  }
}

const Coinbase = model('coinbase', coinbaseSchema)
module.exports = Coinbase