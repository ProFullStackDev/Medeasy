const { Schema, model } = require('mongoose')

const ordersSchema = new Schema({
  user: { type: Schema.Types.ObjectId, required: true, refPath: 'mode' },
  mode: { type: String, required: true, enum: ['user', 'guest'] },
  cart: { type: Schema.Types.ObjectId, required: true, ref: 'cart' },
  razorpay_order_id: String,
  razorpay_signature: String,
  razorpay_payment_id: String,
  method: { type: String, default: 'card' },
  status: { type: 'String', default: 'Pending' },
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
    price: String,
    quantity: Number,
    subTotal: String
  }]
})

ordersSchema.methods = {
  toJSON: function () {
    const order = this.toObject()
    delete order.__v
    return order
  }
}

const Order = model('order', ordersSchema)
module.exports = Order