const { Schema, model } = require('mongoose')
const Product = require('./Product')

const categorySchema = new Schema({
  name: { type: String, required: true },
  description: String,
}, { timestamps: true })

categorySchema.methods = {
  toJSON: function () {
    const category = this.toObject()
    delete category.__v
    return category
  }
}

categorySchema.pre('remove', async function (next) {
  await Product.deleteMany({ category: this._id })
  next()
})

const Category = model('category', categorySchema)
module.exports = Category