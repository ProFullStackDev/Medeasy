const { Router } = require('express')
const router = Router()
const { check } = require('express-validator')
const isAdmin = require('../middleware/isAdmin')
const authenticate = require('../middleware/authenticate')
const {
	createOrder,
	changePaymentMethod,
  changePaymentStatus,
  changeTrackingStatus,
	fetchOrders,
	fetchOrderById,
  fetchOrdersByUserId,
	deleteOrderById
} = require('../controllers/orderController')

// @route - GET /api/orders
// @desc - Get all orders
// @method - Private (both Auth and Admin)
router.get('/', [authenticate, isAdmin], fetchOrders)

// @route - GET /api/orders/:orderId
// @desc - Get order by Id
// @method - Private (both Auth and Admin)
router.get('/:orderId', [authenticate, isAdmin], fetchOrderById)

// @route - GET /api/orders/user
// @desc - Get all orders of a particular user
// @method - Private (Auth)
router.get('/user', authenticate, fetchOrdersByUserId)

// @route - POST /api/orders
// @desc - Create an order
// @method - Public
router.post(
	'/',
	[
		check('cartId', 'Cart Id is required')
			.not()
			.isEmpty(),
		check('mode', 'User mode is required')
			.not()
			.isEmpty(),
		check('userId', 'User Id is required')
			.not()
			.isEmpty(),
		check('cartId', 'Invalid Cart Id').isMongoId(),
		check('userId', 'Invalid User Id').isMongoId(),
		check('shippingAddress.address1', 'Address is required').not().isEmpty(),
		check('shippingAddress.state', 'State is required').not().isEmpty(),
		check('shippingAddress.city', 'City is required').not().isEmpty(),
		check('shippingAddress.phNumber', 'Phone number is required').not().isEmpty(),
		check('billingAddress.address1', 'Address is required').not().isEmpty(),
		check('billingAddress.state', 'State is required').not().isEmpty(),
		check('billingAddress.city', 'City is required').not().isEmpty(),
		check('billingAddress.phNumber', 'Phone number is required').not().isEmpty(),
		check(
			'billingAddress.postalCode',
			'postal must be 5 digits long'
		).isLength({ min: 5, max: 5 }),
		check(
			'billingAddress.phNumber',
			'phone number must be of numbers'
		).isNumeric(),
		check(
			'shippingAddress.postalCode',
			'postal must be 5 digits long'
		).isLength({ min: 5, max: 5 }),
		check(
			'shippingAddress.phNumber',
			'phone number must be of numbers'
		).isNumeric()
	],
	createOrder
)

// @route - PUT /api/orders/method/:orderId
// @desc - Change payment method
// @method - Public
router.patch('/method/:orderId', changePaymentMethod)

// @route - PUT /api/orders/track/:orderId
// @desc - Update Tracking Id
// @method - Private (Both Auth and Admin)
router.patch(
	'/track/:orderId',
	authenticate,
	isAdmin,
	check('trackingId', 'Tracking Id is required')
		.not()
		.isEmpty(),
	changeTrackingStatus
)

// @route - PUT /api/orders/status/:orderId
// @desc - Change payment status
// @method - Public
router.patch('/status/:orderId', changePaymentStatus)

// @route - DELETE /api/orders/:orderId
// @desc - Delete order by Id
// @method - Public
router.delete('/:orderId', deleteOrderById)

module.exports = router
