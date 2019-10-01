const { Schema, model } = require('mongoose')

const reviewSchema = new Schema({
  product: { type: Schema.Types.ObjectId, ref: 'product' },
  user: { type: Schema.Types.ObjectId, ref: 'user' }, 
  rating: {
    type: Number,
    required: true,
    validate (value) { if (value > 5 && value < 0) throw new Error('Rating must be within 0 to 5') }
  },
  text: { type: String, required: true }
})

reviewSchema.methods = {
  toJSON: function () {
    const review = this.toObject()
    delete review.__v
    return review
  }
}

const Review = model('review', reviewSchema)
module.exports = Review