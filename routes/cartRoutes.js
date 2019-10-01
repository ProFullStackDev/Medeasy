const { Router } = require('express')
const router = Router()
const { check } = require('express-validator')

const { generateCartId, addProductToCart } = require('../controllers/cartController')

// @route - GET /api/cart/generateId
// @desc - Generate Cart ID
// @method - Public
router.get('/generateId', generateCartId)

// @route - POST /api/cart/add
// @desc - Add product to cart
// @method - Public
router.post('/add', [
  check('cartId', 'Cart ID is required').not().isEmpty(),
  check('productId', 'Product ID is required').not().isEmpty(),
  check('cartId', 'Invalid Cart Id').isMongoId(),
  check('productId', 'Invalid Product Id').isMongoId(),
  check('attributes.dosage', 'Dosage required').not().isEmpty(),
  check('attributes.quantity', 'Quantity required').not().isEmpty()
], addProductToCart)

module.exports = router