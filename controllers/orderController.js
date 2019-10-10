const { validationResult } = require('express-validator')
const Order = require('../models/Order')
const Cart = require('../models/Cart')
const User = require('../models/User')
const Guest = require('../models/Guest')

module.exports = {

  createOrder: async (req, res) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) return res.status(400).send({ statusCode: 400, message: errors.array() })
    const { cartId, mode, userId } = req.body
    try {
      let order = await Order.findOne({ cart: cartId })
      if (order) return res.send({ statusCode: 200, orderId: order._id })
      const cart = await Cart.findById(cartId)
      let user = await User.findById(userId)
      if (mode === 'guest')
        user = await Guest.findById(guestId)
      if (!user) return res.status(404).send({ statusCode: 404, message: 'User not found' })
      const totalAmount = cart.products.reduce((acc, product) => parseInt(acc) + parseInt(product.subTotal), 0)
      const orderObj = { cart: cart._id, user: user._id, products: cart.products, mode, totalAmount }
      order = await Order.create(orderObj)
      res.status(201).send({ statusCode: 201, orderId: order._id })
    } catch (err) {
      console.log(err.message)
      res.status(500).send({ statusCode: 500, message: 'Server Error' })
    }
  },

  changePaymentMethod: async (req, res) => {
    const { orderId } = req.params
    try {
      if (!orderId) return res.status(400).send({ statusCode: 400, message: 'Order not found' })
      const errors = validationResult(req)
      if (!errors.isEmpty()) 
        return res.status(400).send({ statusCode: 400, message: errors.array() })
      const { method } = req.body
      const order = await Order.findById(orderId)
      order.method = method
      await order.save()
      res.status(202).send({ statusCode: 202, order })
    } catch (err) {
      res.status(500).send({ statusCode: 500, message: 'Server Error'})
    }
  },

  changePaymentStatus: async (req, res) => {
    const { orderId } = req.params
    try {
      if (!orderId) return res.status(400).send({ statusCode: 400, message: 'Order not found' })
      const errors = validationResult(req)
      if (!errors.isEmpty()) 
        return res.status(400).send({ statusCode: 400, message: errors.array() })
      const { status } = req.body
      const order = await Order.findById(orderId)
      order.status = status
      if (status === 'Success') {
        await Cart.findByIdAndDelete(order.cart)
        order.cart = null
        await order.save()
        delete order.cart
      }
      res.status(202).send({ statusCode: 202, order })
    } catch (err) {
      res.status(500).send({ statusCode: 500, message: 'Server Error'})
    }
  },

  fetchOrders: async (req, res) => {
    try {
      const orders = await Order.find({})
      res.send({ statusCode: 200, orders })
    } catch (err) {
      res.status(500).send({ statusCode: 500, message: 'Server Error' })
    }
  },

  deleteOrderById: async (req, res) => {
    const { orderId } = req.params
    if (!orderId) return res.status(400).send({ statusCode: 400, message: 'Order ID not found' })
    try {
      const order = await Order.findByIdAndDelete(orderId)
      if (!order) return res.status(404).send({ statusCode: 404, message: 'Order not found' })
      res.status(202).send({ statusCode: 202, order })
    } catch (err) {
      res.status(500).send({ statusCode: 500, message: 'Server Error' })
    }
  }

}