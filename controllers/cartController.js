const mongoose = require('mongoose')
const { validationResult } = require('express-validator')
const Cart = require('../models/Cart')
const Product = require('../models/Product')
const Coupon = require('../models/Coupon')

module.exports = {
  generateCartId: (req, res) => {
    const cartId = new mongoose.Types.ObjectId()
    res.status(201).send({ statusCode: 201, cartId })
  },

  // Apply Coupon
  applyCoupon: async (req, res) => {
    const errors = validationResult(req)
    if (!errors.isEmpty())
      return res.status(400).send({ statusCode: 400, message: errors.array() })
    try {
      const { name, cartId, subTotal } = req.body
      const coupon = await Coupon.findOne({
        name: name.toUpperCase(),
        expiresAt: { $gt: new Date().getTime() }
      })
      if (!coupon)
        return res
          .status(404)
          .send({ statusCode: 404, message: 'Invalid Coupon' })
      const cart = await Cart.findById(cartId)
      if (!cart)
        return res
          .status(404)
          .send({ statusCode: 404, message: 'Cart not found' })
      if (subTotal < coupon.minimumOrderAmount)
        return res
          .status(400)
          .send({
            statusCode: 400,
            message: `Order value must be minimum $${coupon.minimumOrderAmount}`
          })
      const { name: couponName, type, value } = coupon
      cart.coupon = { name: couponName, type, value }
      await cart.save()
      res.status(202).send({ statusCode: 202, coupon: cart.coupon })
    } catch (err) {
      res.status(500).send({ statusCode: 500, message: 'Server Error' })
    }
  },

  // Remove coupon
  removeCoupon: async (req, res) => {
    const errors = validationResult(req)
    if (!errors.isEmpty())
      return res.status(400).send({ statusCode: 400, message: errors.array() })
    try {
      const { cartId } = req.body
      const cart = await Cart.findById(cartId)
      if (!cart)
        return res
          .status(404)
          .send({ statusCode: 404, message: 'Cart not found' })
      cart.coupon = undefined
      await cart.save()
      res.status(202).send({ statusCode: 202, coupon: {} })
    } catch (err) {
      res.status(500).send({ statusCode: 500, message: 'Server Error' })
    }
  },

  // Add product to cart
  addProductToCart: async (req, res) => {
    const errors = validationResult(req)
    if (!errors.isEmpty())
      return res.status(400).send({ statusCode: 400, message: errors.array() })

    const { cartId, productId, attributes, quantity } = req.body
    if (!cartId)
      return res
        .status(400)
        .send({ statusCode: 400, message: 'Cart Id required' })

    try {
      let cart = await Cart.findById(cartId)
      if (!cart)
        cart = await Cart.create({ _id: cartId, products: [], coupon: null })

      const product = await Product.findById(productId)
      if (!product)
        return res
          .status(404)
          .send({ statusCode: 404, message: 'Product not found' })
      const { name, price: priceObj, photos } = product
      const price = parseInt(priceObj[attributes.dosage][attributes.quantity])

      const productObj = {
        product: productId,
        name,
        attributes,
        image: photos[0],
        price,
        quantity,
        subTotal: quantity * price
      }

      const productIndex = cart.products.findIndex(
        product =>
          product.product.toString() === productId &&
          JSON.stringify(product.attributes) === JSON.stringify(attributes)
      )

      if (productIndex === -1) cart.products.push(productObj)
      else cart.products[productIndex] = productObj

      await cart.save()
      cart = await cart
        .populate('products.product', ['dosages', 'quantities'])
        .execPopulate()
      res.send({ statusCode: 201, cart: cart.products })
    } catch (err) {
      res.status(500).send({ statusCode: 500, message: 'Server Error' })
    }
  },

  // Get products by cartId
  getProductsByCartId: async (req, res) => {
    const { cartId } = req.params
    try {
      if (!cartId)
        return res
          .status(400)
          .send({ statusCode: 400, message: 'Cart id not found' })
      const cart = await Cart.findById(cartId).populate('products.product', [
        'dosages',
        'quantities'
      ])
      if (!cart)
        return res.send({
          statusCode: 200,
          cart: { products: [], coupon: null }
        })
      res.send({ statusCode: 200, cart })
    } catch (err) {
      if (err.name === 'CastError')
        return res
          .status(400)
          .send({ statusCode: 400, message: 'Invalid cart id' })
      res.status(500).send({ statusCode: 500, message: 'Server Error' })
    }
  },

  // Update product quantity by cartId and item id
  updateProduct: async (req, res) => {
    const { cartId } = req.params
    const { itemId } = req.body
    try {
      const errors = validationResult(req)
      if (!errors.isEmpty())
        return res
          .status(400)
          .send({ statusCode: 400, message: errors.array() })

      if (!cartId || !itemId)
        return res
          .status(400)
          .send({ statusCode: 400, message: 'Cart id or item id not found' })
      let cart = await Cart.findById(cartId)
      if (!cart)
        return res
          .status(404)
          .send({ statusCode: 404, message: 'Cart not found' })
      const { mode, value } = req.body
      console.log(mode, value)
      if (mode !== 'dosage' && mode !== 'quantity')
        return res.status(400).send({ statusCode: 400, message: 'Bad Request' })
      // Find the cartProduct
      const cartItemIndex = cart.products.findIndex(
        prod => prod._id.toString() === itemId
      )
      const cartItem = cart.products[cartItemIndex]
      const product = await Product.findById(cartItem.product._id)
      // Check the mode
      if (mode === 'dosage') {
        // Get the new price
        const price = product.price[value][cartItem.attributes.quantity]
        // Update in cart and update the value
        cartItem.price = price
        cartItem.attributes.dosage = value
      } else {
        const price = product.price[cartItem.attributes.dosage][value]
        // Update in cart and update the value
        cartItem.price = price
        cartItem.attributes.quantity = value
      }
      cartItem.subTotal = String(parseInt(cartItem.quantity * cartItem.price))
      // Save the changes
      cart.products[cartItemIndex] = cartItem
      await cart.save()
      cart = await cart
        .populate('products.product', ['dosages', 'quantities'])
        .execPopulate()
      res.send({ statusCode: 200, cart: cart.products })
    } catch (err) {
      if (err.name === 'CastError')
        return res
          .status(400)
          .send({ statusCode: 400, message: 'Invalid cart id' })
      res.status(500).send({ statusCode: 500, message: 'Server Error' })
    }
  },

  // Delete product from cart by cartId and item Id
  deleteProductFromCart: async (req, res) => {
    const { cartId, itemId } = req.params
    try {
      if (!cartId || !itemId)
        return res
          .status(400)
          .send({ statusCode: 400, message: 'Cart id or item id not found' })
      let cart = await Cart.findById(cartId)
      if (!cart)
        return res
          .status(404)
          .send({ statusCode: 404, message: 'Cart not found' })
      cart.products = cart.products.filter(
        product => product._id.toString() !== itemId
      )
      if (cart.products.length === 0) cart.coupon = undefined
      await cart.save()
      cart = await cart
        .populate('products.product', ['dosages', 'quantities'])
        .execPopulate()
      res.send({ statusCode: 200, cart })
    } catch (err) {
      if (err.name === 'CastError')
        return res
          .status(400)
          .send({ statusCode: 400, message: 'Invalid cart id' })
      res.status(500).send({ statusCode: 500, message: 'Server Error' })
    }
  },

  // Clear Cart
  clearCart: async (req, res) => {
    const { cartId } = req.params
    try {
      const errors = validationResult(req)
      if (!errors.isEmpty())
        return res
          .status(400)
          .send({ statusCode: 400, message: errors.array() })
      if (!cartId)
        return res
          .status(400)
          .send({ statusCode: 400, message: 'Cart id not found' })
      const cart = await Cart.findById(cartId)
      if (!cart)
        return res
          .status(404)
          .send({ statusCode: 404, message: 'Cart not found' })
      cart.products = []
      cart.coupon
      await cart.save()
      res.send({ statusCode: 200, cart: cart.products })
    } catch (err) {
      if (err.name === 'CastError')
        return res
          .status(400)
          .send({ statusCode: 400, message: 'Invalid cart id' })
    }
  },

  // Return total amount from cart
  returnTotalAmount: async (req, res) => {
    const { cartId } = req.params
    try {
      if (!cartId)
        return res
          .status(400)
          .send({ statusCode: 400, message: 'Cart Id not found' })
      const cart = await Cart.findById(cartId)
      if (!cart)
        return res
          .status(404)
          .send({ statusCode: 404, message: 'Cart not found' })
      const totalPrice = cart.products.reduce(
        (acc, product) => acc + parseInt(product.subTotal),
        0
      )
      res.status(202).send({ statusCode: 202, totalPrice })
    } catch (err) {
      if (err.name === 'CastError')
        return res
          .status(400)
          .send({ statusCode: 400, message: 'Invalid Cart Id' })
      res.status(500).send({ statusCode: 500, message: 'Server Error' })
    }
  }
}
