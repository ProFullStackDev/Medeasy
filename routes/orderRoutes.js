const { Router } = require('express')
const router = Router()
const { check } = require('express-validator')
const isAdmin = require('../middleware/isAdmin')
const authenticate = require('../middleware/authenticate')
const { createOrder, changePaymentMethod, changePaymentStatus, fetchOrders, deleteOrderById } = require('../controllers/orderController')

// @route - GET /api/orders
// @desc - Get all orders
// @method - Private (both Auth and Admin)
router.get('/', [authenticate, isAdmin], fetchOrders)

// @route - POST /api/orders
// @desc - Delete product from cart by CartId and Item Id
// @method - Public or Private (Not necessarily needed to be private)
router.post('/', [
  check('cartId', 'Cart Id is required').not().isEmpty(),
  check('mode', 'User mode is required').not().isEmpty(),
  check('userId', 'User Id is required').not().isEmpty(),
  check('cartId', 'Invalid Cart Id').isMongoId(),
  check('userId', 'Invalid User Id').isMongoId()
], createOrder)

// @route - PUT /api/orders/method/:orderID
// @desc - Change payment method
// @method - Public
router.patch('/method/:orderId', changePaymentMethod)

// @route - PUT /api/orders/status/:orderID
// @desc - Change payment status
// @method - Public
router.patch('/status/:orderId', changePaymentStatus)

// @route - DELETE /api/orders/:orderId
// @desc - Delete order by ID
// @method - Public
router.delete('/:orderId', deleteOrderById)

module.exports = router