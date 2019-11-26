const Review = require('../models/Review')
const { validationResult } = require('express-validator')

module.exports = {

  getReviewsByProductId: async (req, res) => {
    const { productId } = req.params
    try {
      if (!productId) return res.status(400).send({ statusCode: 400, message: 'Product Id not found' })
      const reviews = await Review.find({ product: productId }).populate('product', ['name']).populate('user', ['name', 'email'])
      res.send({ statusCode: 200, reviews })
    } catch (err) {
      if (err.name === 'CastError') return res.status(400).send({ statusCode: 400, message: 'Invalid Product Id' })
      res.status(500).send({ statusCode: 500, message: 'Server Error' })
    }
  },

  postReviewForProduct: async (req, res) => {

    const errors = validationResult(req)
    if (!errors.isEmpty()) return res.status(400).send({ statusCode: 400, message: errors.array() })
    
    const { productId } = req.params
    try {
      if (!productId) return res.status(400).send({ statusCode: 400, message: 'Product Id not found' })

      let review = await Review.findOne({ user: req.user._id, product: productId, text: req.body.text }).populate('product', ['name']).populate('user', ['name', 'email'])

      if (review) return res.send({ statusCode: 200, review })
      review = new Review(req.body)
      review.product = productId
      review.user = req.user._id
      await review.save()

      review = await review.populate('product', ['name']).populate('user', ['name', 'email']).execPopulate()
      res.status(201).send({ statusCode: 201, review })
    } catch (err) {
      if (err.name === 'CastError') return res.status(400).send({ statusCode: 400, message: 'Invalid Product Id' })
      res.status(500).send({ statusCode: 500, message: 'Server Error' })
    }
  }

}