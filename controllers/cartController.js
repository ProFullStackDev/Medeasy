const mongoose = require('mongoose')
const { validationResult } = require('express-validator')
const Cart = require('../models/Cart')

module.exports = {

  generateCartId: (req, res) => {
    const cartId = new mongoose.Types.ObjectId()
    res.status(201).send({ statusCode: 201, cartId })
  },

  addProductToCart: async (req, res) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) return res.status(400).send({ statusCode: 400, message: errors.array() })
    const { cartId, productId, attributes } = req.body
    if (!cartId) return res.status(400).send({ statusCode: 400, message: 'Cart Id required' })
    try {
      let cart = await Cart.findById(cartId)
      if (!cart) cart = await Cart.create({ _id: cartId, products: [] })
      const product = await Product.find()
      res.send({ statusCode: 201, cart })
    } catch (err) {
      console.error(err.message)
      res.status(500).send({ statusCode: 500, message: 'Server Error' })
    }
  }
}