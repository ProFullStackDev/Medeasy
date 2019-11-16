const { Schema, model } = require('mongoose')

const couponSchema = new Schema({
  name: { type: String, required: true },
  type: { type: String, required: true },
  value: { type: Number, required: true },
  description: { type: String, required: true },
  expiresAt: { 
    type: Date, 
    required: true, 
    min: `${new Date().getFullYear()}-${new Date().getMonth() + 1}-${new Date().getDate()}`,
    max: `${new Date().getFullYear() + 1}-12-31`
  },
  minimumOrderAmount: { type: Number, required: true }
}, { timestamps: true })

couponSchema.methods = {
  toJSON: function () {
    const coupon = this.toObject()
    delete coupon.__v
    return coupon
  }
}

const Coupon = model('coupon', couponSchema)
module.exports = Coupon