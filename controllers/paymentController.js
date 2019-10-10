const { validationResult } = require('express-validator')
const crypto = require('crypto')
const { orders: { OrdersCreateRequest, OrdersCaptureRequest } } = require('@paypal/checkout-server-sdk')

const {
  resources: { Charge },
  Webhook
} = require('coinbase-commerce-node')

const Order = require('../models/Order')
const instance = require('../utils/razorPay')
const { client } = require('../utils/paypal')
const coinbaseClient = require('../utils/coinbase')

module.exports = {

  createRazorpayOrder: async (req, res) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) return res.status(400).send({ statusCode: 400, message: errors.array() })
    const { orderId, currency, amount } = req.body
    try {
      const order = await Order.findById(orderId)
      if (order.razorpay_order_id) return res.send({ statusCode: 200, rzpOrderId: order.razorpay_order_id })
      const rzpOrder = await instance.orders.create({ amount, currency, receipt: `Order ${orderId}` })
      order.razorpay_order_id = rzpOrder.id
      await order.save()
      res.send({ statusCode: 200, rzpOrderId: rzpOrder.id })
    } catch (err) {
      console.error(err.message, err)
      res.status(500).send({ statusCode: 500, message: 'Server Error' })
    }
  },

  createPaypalOrder: async (req, res) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) return res.status(400).send({ statusCode: 400, message: errors.array() })
    const { amount, currency, orderId } = req.body
    const request = new OrdersCreateRequest()
    request.prefer('return=representation')
    request.requestBody({
      intent: 'CAPTURE',
      purchase_units: [{
        amount: {
          currency_code: currency,
          value: amount
        }
      }]
    })
  
    try {
      const ppOrder = await client().execute(request)
      const order = await Order.findById(orderId)
      order.paypal_order_id = ppOrder.result.id
      await order.save()
      res.status(201).send({ statusCode: 201, ppOrderId: ppOrder.result.id })
    } catch (err) {
      res.status(500).send({ statusCode: 500, message: JSON.parse(err.message) })
    }
  
  },

  createRazorpayCharge: async (req, res) => {

    // Error checking from client side
    const errors = validationResult(req)
    if (!errors.isEmpty()) return res.status(400).send({ statusCode: 400, message: errors.array() })
    
    const { paymentId, orderId, signature, medEasyOrderId } = req.body
    
    // Signature verification
    const hmac = crypto.createHmac('sha256', process.env.RAZORPAY_TEST_KEY_SECRET)
    hmac.update(orderId + '|' + paymentId)
    const signatureCheck = hmac.digest('hex')
    if (signatureCheck !== signature)
      return res.status(400).send({ statusCode: 400, message: 'Signature failure' })
    
    try {
      const order = await Order.findOne({ _id: medEasyOrderId, razorpay_order_id: orderId })
      if (!order) 
        return res.status(404).send({ statusCode: 404, message: 'Order not found. Please contact our customer care' })
      order.razorpay_payment_id = paymentId
      order.razorpay_payment_signature = signature
      await order.save()
      const data = await instance.payments.capture(paymentId, amount * 100)

      if (data.status === 'captured') {
        return res.send({ statusCode: 200, message: 'Payment successfully received' })
      }
      res.status(400).send({ statusCode: 400, message: 'There seems to be an error in capturing the payment. Please contact our customer care' })
    } catch (err) {
      console.log(err.message, err)
      res.status(500).send({ statusCode: 500, message: 'Server Error' })
    }
  },

  createPaypalCharge: async (req, res) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) return res.status(400).send({ statusCode: 400, message: errors.array() })
    const { paypalOrderId, orderId } = req.body
    const request = new OrdersCaptureRequest(paypalOrderId)
    request.requestBody({})
    try {
      const order = await Order.findOne({ _id: orderId, paypal_order_id: paypalOrderId })
      if (!order) return res.status(400).send({ statusCode: 400, message: 'Order not found. Please ' })
      const { result: { purchase_units: { 0: { amount: { value }, payments: { captures: { 0: id } } } } } } = await client().execute(request)
      if (parseInt(value) === parseInt(order.totalAmount)) {
        order.paypal_capture_id = id
        await order.save()
        return res.send({ statusCode: 200, message: 'Payment succesfully received' })
      }
      else return res.status(400).send({ statusCode: 400, message: 'Amount sent not equal to real amount' })  
    } catch (err) {
      console.log(JSON.parse(err.message))
      res.status(500).send({ statusCode: 500, message: 'Server Error' })
    }
  },

  createCoinbaseCharge: async (req, res) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) 
      return res.status(400).send({ statusCode: 400, message: errors.array() })
    try {
      const { orderId, amount, currency } = req.body
      const chargeData = {
        name: 'Medeasy',
        description: `Order number ${orderId}`,
        local_price: {
          amount,
          currency
        },
        pricing_type: 'fixed_price'
      }
      const { addresses, code, hosted_url, id } = await Charge.create(chargeData)
      const order = await Order.findById(orderId)
      order.coinbase_order_code = code
      await order.save()
      res
        .status(201)
        .send({ statusCode: 201, charge: { coinbaseId: id, addresses, code, hosted_url } })
    } catch (err) {
      console.error(err.message)
      res.status(500).send({ statusCode: 500, message: 'Server Error' })
    }
  },

  verifyCoinbaseCharge: async (req, res) => {
    const webhookSignature = req.header('x-cc-webhook-signature')
    console.log(webhookSignature)
    const {
      event: {
        type,
        data: { id, code, name }
      }
    } = req.body
    try {
      Webhook.verifySigHeader(
        JSON.stringify(req.body),
        webhookSignature,
        process.env.COINBASE_SHARED_SECRET
      )
      console.log(`Request of ${type} with id ${id} and code ${code} with the name of ${name}`)
      res.send({ statusCode: 200 })
    } catch (err) {
      console.log(err.message)
      res.status(500).send({ statusCode: 500, message: 'Signature incorrect' })
    }
  }
}