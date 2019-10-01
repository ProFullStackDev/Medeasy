const { Schema, model } = require('mongoose')

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

const Category = model('category', categorySchema)
module.exports = Category