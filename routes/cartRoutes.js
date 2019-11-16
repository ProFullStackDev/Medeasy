const { Router } = require('express')
const router = Router()
const { check } = require('express-validator')

const {
	applyCoupon,
	removeCoupon,
	generateCartId,
	addProductToCart,
	getProductsByCartId,
	updateProduct,
	deleteProductFromCart,
	clearCart,
	returnTotalAmount
} = require('../controllers/cartController')

// @route - GET /api/cart/generateId
// @desc - Generate Cart ID
// @method - Public
router.get('/generateId', generateCartId)

// @route - POST /api/cart/add
// @desc - Add product to cart
// @method - Public
router.post(
	'/add',
	[
		check('cartId', 'Cart ID is required')
			.not()
			.isEmpty(),
		check('quantity', 'Quantity is required')
			.not()
			.isEmpty(),
		check('productId', 'Product ID is required')
			.not()
			.isEmpty(),
		check('cartId', 'Invalid Cart Id').isMongoId(),
		check('productId', 'Invalid Product Id').isMongoId(),
		check('attributes.dosage', 'Dosage required')
			.not()
			.isEmpty(),
		check('attributes.quantity', 'Quantity required')
			.not()
			.isEmpty()
	],
	addProductToCart
)

// @route - GET /api/cart/:cartId
// @desc - Get products in cart
// @method - Public
router.get('/:cartId', getProductsByCartId)

// @route - PATCH /api/cart/:cartId
// @desc - Update product quantity by CartId and Item ID
// @method - Public
router.patch(
	'/:cartId',
	[
		check('itemId', 'Item id is required')
			.not()
			.isEmpty(),
		check('itemId', 'Item id must be a Mongo Id').isMongoId(),
		check('mode', 'Mode is required')
			.not()
			.isEmpty(),
		check('value', 'Value is required')
			.not()
			.isEmpty()
	],
	updateProduct
)

// @route - PATCH /api/cart/coupon/redeem
// @desc - Apply coupon by CartId
// @method - Public
router.patch('/coupon/redeem', [
	check('cartId', 'Cart Id is required').not().isEmpty(),
	check('cartId', 'Invalid Cart Id').isMongoId(),
	check('name', 'Coupon name is required').not().isEmpty(),
	check('subTotal', 'Sub Total is required').not().isEmpty(),
	check('subTotal', 'Sub Total must be a number').isNumeric()
], applyCoupon)

// @route - PATCH /api/cart/coupon/remove
// @desc - Remove coupon by CartId
// @method - Public
router.patch('/coupon/remove', [
	check('cartId', 'Cart Id is required').not().isEmpty(),
	check('cartId', 'Invalid Cart Id').isMongoId(),
], removeCoupon)

// @route - DELETE /api/cart/empty/:cartId
// @desc - Clear Cart
// @method - Public
router.delete('/empty/:cartId', clearCart)

// @route - DELETE /api/cart/:cartId/:itemId
// @desc - Delete product from cart by CartId and Item Id
// @method - Public
router.delete('/:cartId/:itemId', deleteProductFromCart)

// @route - GET /api/cart/total/:cartId
// @desc - Get total price from cart
// @method - Public
router.get('/total/:cartId', returnTotalAmount)

module.exports = router
