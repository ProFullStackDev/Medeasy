const { Router } = require('express')
const router = Router()
const { check } = require('express-validator')

const { createOrder, changePaymentMethod, changePaymentStatus } = require('../controllers/orderController')

// @route - POST /orders
// @desc - Delete product from cart by CartId and Item Id
// @method - Public or Private (Not necessarily needed to be private)
router.post('/', [
  check('cartId', 'Cart Id is required').not().isEmpty(),
  check('mode', 'User mode is required').not().isEmpty(),
  check('userId', 'User Id is required').not().isEmpty(),
  check('cartId', 'Invalid Cart Id').isMongoId(),
  check('userId', 'Invalid User Id').isMongoId()
], createOrder)

// @route - PUT /orders/method/:orderID
// @desc - Change payment method
// @method - Public
router.patch('/method/:orderId', changePaymentMethod)

// @route - PUT /orders/status/:orderID
// @desc - Change payment status
// @method - Public
router.patch('/method/:orderId', changePaymentStatus)

module.exports = router