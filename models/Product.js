const { Schema, model } = require('mongoose')

const productSchema = new Schema({
  name: { type: String, trim: true, required: true },
  description: { type: String, trim: true, required: true},
  price: { type: Number, trim: true, required: true},
  category: { type: Schema.Types.ObjectId, ref: 'category' },
  user: { type: Schema.Types.ObjectId, ref: 'user' },
  totalQuantity: { type: Number, required: true },
  photos: { type: [String], required: true },
}, { timestamps: true })

productSchema.methods = {
  toJSON: function () {
    const product = this.toObject()
    delete product.__v
    return product
  }
}

productSchema.index({ name: 'text' })

const Product = model('product', productSchema)
module.exports = Product