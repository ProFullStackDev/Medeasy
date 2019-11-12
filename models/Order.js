const { Schema, model } = require('mongoose')
const Cart = require('./Cart')

const ordersSchema = new Schema({
  user: { type: Schema.Types.ObjectId, required: true, refPath: 'mode' },
  mode: { type: String, required: true, enum: ['user', 'guest'] },
  cart: { type: Schema.Types.ObjectId, required: true, ref: 'cart' },
  couponUsed: { type: String, required: true},
  shippingAddress: {
    name: String,
    addressLine1: String,
    addressLine2: String,
    city: String,
    state: String,
    postalCode: Number,
    country: { type: String, default: 'United States of America'},
    phNumber: Number,
    faxNumber: Number
  },
  billingAddress: {
    name: String,
    address1: String,
    address2: String,
    city: String,
    state: String,
    postalCode: Number,
    country: { type: String, default: 'United States of America'},
    phNumber: Number,
    faxNumber: Number
  },
  razorpay_order_id: String,
  coinbase_order_code: String,
  razorpay_signature: String,
  razorpay_payment_id: String,
  paypal_order_id: String,
  paypal_capture_id: String,
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
    image: String,
    price: String,
    quantity: Number,
    subTotal: String
  }],
  totalAmount: Number,
  trackingId: { type: String, default: 'nil' },
  expiryDate: Date
}, { timestamps: true })

ordersSchema.methods = {
  toJSON: function () {
    const order = this.toObject()
    delete order.__v
    return order
  }
}

ordersSchema.pre('save', async function (next) {
  if (this.status === 'Success') await Cart.findByIdAndDelete(this.cart)
  next()
})

const Order = model('order', ordersSchema)
module.exports = Order