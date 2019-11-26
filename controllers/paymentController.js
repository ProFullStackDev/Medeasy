const { validationResult } = require('express-validator')
const crypto = require('crypto')
const Axios = require('axios')
const {
  orders: { OrdersCreateRequest, OrdersCaptureRequest }
} = require('@paypal/checkout-server-sdk')
const incrementProductSales = require('../utils/incrementPrdouctSales')

const {
  resources: { Charge },
  Webhook
} = require('coinbase-commerce-node')

const Order = require('../models/Order')
const Coinbase = require('../models/Coinbase')
const instance = require('../utils/razorPay')
const { client } = require('../utils/paypal')
require('../utils/coinbase')

module.exports = {
  createRazorpayOrder: async (req, res) => {
    const errors = validationResult(req)
    if (!errors.isEmpty())
      return res.status(400).send({ statusCode: 400, message: errors.array() })
    const { orderId, currency, amount } = req.body
    try {
      const {
        data: {
          quotes: { USDINR }
        }
      } = await Axios.get('http://apilayer.net/api/live', {
        params: {
          access_key: process.env.CURRENCY_LAYER_KEY,
          currencies: 'USD,INR'
        }
      })
      const order = await Order.findById(orderId)
      if (!order)
        return res
          .status(404)
          .send({ statusCode: 404, message: 'Order not found' })
      if (order.razorpay_order_id)
        return res.send({
          statusCode: 200,
          rzpOrderId: order.razorpay_order_id,
          currencyRate: USDINR
        })
      const rzpOrder = await instance.orders.create({
        amount: Math.round(parseInt(amount) * USDINR) * 100,
        currency,
        receipt: `Order ${orderId}`
      })
      order.razorpay_order_id = rzpOrder.id
      await order.save()
      res.send({
        statusCode: 200,
        rzpOrderId: rzpOrder.id,
        currencyRate: String(USDINR)
      })
    } catch (err) {
      res.status(500).send({ statusCode: 500, message: 'Server Error' })
    }
  },

  createPaypalOrder: async (req, res) => {
    const errors = validationResult(req)
    if (!errors.isEmpty())
      return res.status(400).send({ statusCode: 400, message: errors.array() })
    const { amount, currency, orderId } = req.body
    const order = await Order.findById(orderId).populate('user', [
      'name',
      'email'
    ])
    if (!order)
      return res
        .status(404)
        .send({ statusCode: 404, message: 'Order not found' })
    const {
      data: {
        quotes: { USDINR }
      }
    } = await Axios.get('http://apilayer.net/api/live', {
      params: {
        access_key: process.env.CURRENCY_LAYER_KEY,
        currencies: 'USD,INR'
      }
    })

    const request = new OrdersCreateRequest()
    request.prefer('return=representation')
    request.requestBody({
      intent: 'CAPTURE',
      application_context: {
        return_url: 'https://localhost:3000/payment/success',
        brand_name: 'Medeasy'
      },
      payer: {
        name: {
          given_name: order.user.name
        },
        address: {
          address_line_1: order.billingAddress.address1,
          address_line_2: order.billingAddress.address2,
          admin_area_2: order.billingAddress.city,
          admin_area_1: order.billingAddress.state,
          postal_code: order.billingAddress.postalCode,
          country_code: 'US'
        },
        email_address: order.user.email,
        phone: {
          phone_type: 'MOBILE',
          phone_number: {
            national_number: `1${order.billingAddress.phNumber}`
          }
        }
      },
      purchase_units: [
        {
          reference_id: order._id,
          amount: {
            currency_code: currency,
            value: Math.round(parseInt(amount) * USDINR)
          },
          shipping: {
            address: {
              address_line_1: order.shippingAddress.address1,
              address_line_2: order.shippingAddress.address2,
              admin_area_2: order.shippingAddress.city,
              admin_area_1: order.shippingAddress.state,
              postal_code: order.shippingAddress.postalCode,
              country_code: 'US'
            }
          }
        }
      ]
    })

    try {
      const ppOrder = await client().execute(request)
      order.paypal_order_id = ppOrder.result.id
      await order.save()
      res.status(201).send({
        statusCode: 201,
        ppOrderId: ppOrder.result.id,
        currencyRate: USDINR
      })
    } catch (err) {
      
      res
        .status(500)
        .send({ statusCode: 500, message: JSON.p })
    }
  },

  createCoinbaseOrder: async (req, res) => {
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
      const { addresses, code, hosted_url, id } = await Charge.create(
        chargeData
      )
      const order = await Order.findById(orderId)
      if (!order)
        return res
          .status(404)
          .send({ statusCode: 404, message: 'Order not found' })
      order.coinbase_order_code = code
      await order.save()
      res.status(201).send({
        statusCode: 201,
        charge: { coinbaseId: id, addresses, code, hosted_url }
      })
    } catch (err) {
      res.status(500).send({ statusCode: 500, message: 'Server Error' })
    }
  },

  createRazorpayCharge: async (req, res) => {
    // Error checking from client side
    const errors = validationResult(req)
    if (!errors.isEmpty())
      return res.status(400).send({ statusCode: 400, message: errors.array() })

    const { paymentId, orderId, signature, medEasyOrderId, amount } = req.body

    // Signature verification
    const hmac = crypto.createHmac(
      'sha256',
      process.env.RAZORPAY_TEST_KEY_SECRET
    )
    hmac.update(orderId + '|' + paymentId)
    const signatureCheck = hmac.digest('hex')
    if (signatureCheck !== signature)
      return res
        .status(400)
        .send({ statusCode: 400, message: 'Signature failure' })

    try {
      const order = await Order.findOne({
        _id: medEasyOrderId,
        razorpay_order_id: orderId,
        status: 'Pending'
      })
      if (!order)
        return res.status(404).send({
          statusCode: 404,
          message: 'Order not found. Please contact our customer care'
        })
      order.razorpay_payment_id = paymentId
      order.razorpay_payment_signature = signature
      await order.save()
      const data = await instance.payments.capture(paymentId, amount)

      if (data.status === 'captured') {
        order.status = 'Success'
        order.method = 'card'
        order.coinbase_order_code = undefined
        order.paypal_order_id = undefined
        order.paidAt = new Date()
        await order.save()
        incrementProductSales(...order.products.map(product => product.product))
        return res.status(203).send({
          statusCode: 203,
          order: {
            _id: order._id,
            method: order.method,
            status: order.status,
            products: order.products,
            totalAmount: order.totalAmount,
            razorpayPaymentId: order.razorpay_payment_id
          }
        })
      }

      res.status(400).send({
        statusCode: 400,
        message:
          'There seems to be an error in capturing the payment. Please contact our customer care'
      })
    } catch (err) {
      res.status(500).send({ statusCode: 500, message: 'Server Error' })
    }
  },

  createPaypalCharge: async (req, res) => {
    const errors = validationResult(req)
    if (!errors.isEmpty())
      return res.status(400).send({ statusCode: 400, message: errors.array() })

    const { paypalOrderId, orderId, currencyRate } = req.body
    const request = new OrdersCaptureRequest(paypalOrderId)
    request.requestBody({})

    try {
      const order = await Order.findOne({
        _id: orderId,
        paypal_order_id: paypalOrderId,
        status: 'Pending'
      })
      if (!order)
        return res.status(400).send({
          statusCode: 400,
          message: 'Order not found. Please contact our customer care'
        })
      const {
        result: {
          purchase_units: {
            0: {
              payments: {
                captures: {
                  0: {
                    id,
                    amount: { value }
                  }
                }
              }
            }
          }
        }
      } = await client().execute(request)

      if (parseInt(value) === Math.round(currencyRate * order.totalAmount)) {
        order.paypal_capture_id = id
        order.razorpay_order_id = undefined
        order.coinbase_order_code = undefined
        order.status = 'Success'
        order.method = 'paypal'
        order.paidAt = new Date()
        await order.save()
        incrementProductSales(...order.products.map(product => product.product))
        return res.status(203).send({
          statusCode: 203,
          order: {
            _id: order._id,
            method: order.method,
            status: order.status,
            products: order.products,
            totalAmount: order.totalAmount,
            paypalCaptureId: order.paypal_capture_id
          }
        })
      } else
        return res.status(400).send({
          statusCode: 400,
          message: 'Amount sent not equal to real amount'
        })
    } catch (err) {
      res.status(500).send({ statusCode: 500, message: 'Server Error' })
    }
  },

  storeCoinbaseCharge: async (req, res) => {
    // Webhook

    const webhookSignature = req.header('x-cc-webhook-signature')
    const {
      id,
      code,
      payments: {
        0: {
          status,
          value: { local, crypto }
        }
      }
    } = req.body.event.data
    try {
      Webhook.verifySigHeader(
        JSON.stringify(req.body),
        webhookSignature,
        process.env.COINBASE_SHARED_SECRET
      )

      const coinbaseObj = {
        coinbaseId: id,
        status,
        code,
        primaryPaymentValue: crypto,
        localPrimaryPaymentValue: local
      }

      await Coinbase.create(coinbaseObj)
      res.send({ statusCode: 200 })
    } catch (err) {
      res.status(500).send({ statusCode: 500, message: 'Signature incorrect' })
    }
  },

  createCoinbaseCharge: async (req, res) => {
    const errors = validationResult(req)
    if (!errors.isEmpty())
      return res.status(400).send({ statusCode: 400, message: errors.array() })
    try {
      const { chargeCode, userId } = req.body
      const coinbaseTransaction = await Coinbase.findOne({ code: chargeCode })
      // If there is no transaction means, return invalid order code
      if (!coinbaseTransaction)
        return res
          .status(404)
          .send({ statusCode: 404, message: 'Invalid Order Code' })
      // We check whether the user who placed the order has entered the code. For that we query the Order datbase with user and orderCode
      const order = await Order.findOne({
        user: userId,
        coinbase_order_code: chargeCode,
        status: 'Pending'
      })
      if (!order)
        return res.status(403).send({
          statusCode: 403,
          message:
            'You have not purchased this order / Transaction complete already'
        })
      order.status = 'Success'
      order.method = 'bitcoin'
      order.razorpay_order_id = undefined
      order.paypal_order_id = undefined
      order.paidAt = new Date()
      await order.save()
      incrementProductSales(...order.products.map(product => product.product))
      // Everything goes well. Hence release the order
      res.status(202).send({
        statusCode: 202,
        order: {
          _id: order._id,
          method: order.method,
          status: order.status,
          products: order.products,
          totalAmount: order.totalAmount,
          coinbase_order_code: order.coinbase_order_code
        }
      })
    } catch (err) {
      res.status(500).send({ statusCode: 500, message: 'Server Error' })
    }
  },

  createWesternUnionCharge: async (req, res) => {
    try {
      const errors = validationResult(req)
      if (!errors.isEmpty())
        return res
          .status(400)
          .send({ statusCode: 400, message: errors.array() })
      const { orderId, senderName, paymentNumber, moneyReceived } = req.body
      const order = await Order.findById(orderId)
      if (!order)
        return res
          .status(404)
          .send({ statusCode: 404, message: 'Order not found' })
      order.westenUnion = {
        moneyReceived,
        senderName,
        paymentNumber
      }
      order.status = 'Success'
      order.method = 'Western Union'
      order.paidAt = new Date()
      await order.save()
      incrementProductSales(...order.products.map(product => product.product))
      res.status(202).send({ statusCode: 202, order })
    } catch (err) {
      res.status(500).send({ statusCode: 500, message: 'Server Error' })
    }
  }
}
