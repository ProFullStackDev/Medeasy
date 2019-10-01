const { Router } = require('express')
const router = Router()
const { check } = require('express-validator')

const { generateCartId, addProductToCart, getProductsByCartId, updateProductQuantity, deleteProductFromCart } = require('../controllers/cartController')

// @route - GET /api/cart/generateId
// @desc - Generate Cart ID
// @method - Public
router.get('/generateId', generateCartId)

// @route - POST /api/cart/add
// @desc - Add product to cart
// @method - Public
router.post('/add', [
  check('cartId', 'Cart ID is required').not().isEmpty(),
  check('quantity', 'Quantity is required').not().isEmpty(),
  check('productId', 'Product ID is required').not().isEmpty(),
  check('cartId', 'Invalid Cart Id').isMongoId(),
  check('productId', 'Invalid Product Id').isMongoId(),
  check('attributes.dosage', 'Dosage required').not().isEmpty(),
  check('attributes.quantity', 'Quantity required').not().isEmpty()
], addProductToCart)

// @route - GET /api/cart/:cartId
// @desc - Get products in cart
// @method - Public
router.get('/:cartId', getProductsByCartId)

// @route - PATCH /api/cart/:cartId
// @desc - Update product quantity by CartId and Item ID
// @method - Public
router.patch('/:cartId', [
  check('itemId', 'Item id is required').not().isEmpty(),
  check('itemId', 'Item id must be a Mongo Id').isMongoId(),
  check('quantity', 'Quantity is required').not().isEmpty(),
  check('quantity', 'Quantity must be a number').isNumeric()
], updateProductQuantity)

// @route - DELETE /api/cart/:cartId
// @desc - Delete product from cart by CartId and Item Id
// @method - Public
router.delete('/:cartId', [
  check('itemId', 'Item id is required').not().isEmpty(),
  check('itemId', 'Item id must be a Mongo Id').isMongoId(),
],
deleteProductFromCart)

module.exports = router