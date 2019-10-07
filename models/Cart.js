const { Schema, model } = require('mongoose')

const cartSchema = new Schema({
  // user: {
  //   type: Schema.Types.ObjectId,
  //   default: null
  // },
  products: [{
    product: { type: Schema.Types.ObjectId, ref: 'product', required: true },
    name: String,
    attributes: {
      type: {
        dosage: { type: String, required: true },
        quantity: { type: String, required: true }
      },
      required: true
    },
    image: String,
    price: String,
    quantity: Number,
    subTotal: String
  }]
})

cartSchema.methods = {
  toJSON: function () {
    const cart = this.toObject()
    delete cart.__v
    return cart
  }
}

const Cart = model('cart', cartSchema)
module.exports = Cart