const mongoose = require('mongoose')
const { validationResult } = require('express-validator')
const Cart = require('../models/Cart')
const Product = require('../models/Product')

module.exports = {

  generateCartId: (req, res) => {
    const cartId = new mongoose.Types.ObjectId()
    res.status(201).send({ statusCode: 201, cartId })
  },

  // Add product to cart
  addProductToCart: async (req, res) => {

    const errors = validationResult(req)
    if (!errors.isEmpty()) return res.status(400).send({ statusCode: 400, message: errors.array() })

    const { cartId, productId, attributes, quantity } = req.body
    if (!cartId) return res.status(400).send({ statusCode: 400, message: 'Cart Id required' })

    try {
      let cart = await Cart.findById(cartId)
      if (!cart) cart = await Cart.create({ _id: cartId, products: [] })

      const product = await Product.findById(productId)
      if (!product) return res.status(404).send({ statusCode: 404, message: 'Product not found' })
      const { name, price: priceObj, photos } = product
      const price = parseInt(priceObj[attributes.dosage][attributes.quantity])
      
      const productObj = { product: productId, name, attributes, image: photos[0], price, quantity, subTotal: quantity * price }

      const productIndex = cart.products.findIndex(product => product.product.toString() === productId && JSON.stringify(product.attributes) === JSON.stringify(attributes))

      if (productIndex === -1)
        cart.products.push(productObj)
      else
        cart.products[productIndex] = productObj
  
      await cart.save()
      res.send({ statusCode: 201, cart })
    } catch (err) {
      console.error(err.message, err)
      res.status(500).send({ statusCode: 500, message: 'Server Error' })
    }
  },

  // Get products by cartId
  getProductsByCartId: async (req, res) => {
    const { cartId } = req.params
    try {
      if (!cartId) return res.status(400).send({ statusCode: 400, message: 'Cart id not found' })
      const cart = await Cart.findById(cartId)
      res.send({ statusCode: 200, cart })
    } catch (err) {
      if (err.name === 'CastError') return res.status(400).send({ statusCode: 400, message: 'Invalid cart id' })
    }
  },

  // Update product quantity by cartId and item id
  updateProductQuantity: async (req, res) => {
    const { cartId } = req.params
    const { itemId } = req.body
    try {
      const errors = validationResult(req)
      if (!errors.isEmpty()) return res.status(400).send({ statusCode: 400, message: errors.array() })

      if (!cartId || !itemId) return res.status(400).send({ statusCode: 400, message: 'Cart id or item id not found' })

      const cart = await Cart.findById(cartId)
      if (!cart) return res.status(404).send({ statusCode: 404, message: 'Cart not found' })

      const productIndex = cart.products.findIndex(product => product._id.toString() === itemId)
      if (productIndex === -1) return res.status(500).send({ statusCode: 500, message: 'Item doesnt exist' })
      cart.products[productIndex].quantity = req.body.quantity
      cart.products[productIndex].subTotal = req.body.quantity * parseInt(cart.products[productIndex].price)
      await cart.save()
      res.send({ statusCode: 200, cart })

    } catch (err) {
      if (err.name === 'CastError') return res.status(400).send({ statusCode: 400, message: 'Invalid cart id' })
    }
  },

  // Delete product from cart by cartId and item Id
  deleteProductFromCart: async (req, res) => {
    const { cartId } = req.params
    const { itemId } = req.body
    try {
      const errors = validationResult(req)
      if (!errors.isEmpty()) return res.status(400).send({ statusCode: 400, message: errors.array() })
      if (!cartId || !itemId) return res.status(400).send({ statusCode: 400, message: 'Cart id or item id not found' })
      const cart = await Cart.findById(cartId)
      if (!cart) return res.status(404).send({ statusCode: 404, message: 'Cart not found' })
      cart.products = cart.products.filter(product => product._id.toString() !== itemId)
      await cart.save()
      res.send({ statusCode: 200, cart })
    } catch (err) {
      if (err.name === 'CastError') return res.status(400).send({ statusCode: 400, message: 'Invalid cart id' })
    }
  }
}