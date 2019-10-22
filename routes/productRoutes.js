const { Router } = require('express')
const { check } = require('express-validator')
const multer = require('multer')

const authenticate = require('../middleware/authenticate')
const isAdmin = require('../middleware/isAdmin')
const { updateProductAvailability, createProduct, fetchAllProducts, fetchAllProductsByCategory, fetchProductById, updateProductById, deleteProductById } = require('../controllers/productController')
const { storage, limits, fileFilter } = require('../utils/multerUtils')

const upload = multer({ storage, limits, fileFilter })
const router = Router()

// @route - POST /api/products/
// @desc - Create a new product
// @method - Private (Both Auth and Admin)
router.post('/:categoryId', authenticate, isAdmin, upload.array('product-image', 3), [
  check('name', 'Name is required').not().isEmpty(),
  check('description', 'Description is required').not().isEmpty(),
  check('sideEffects', 'Side Effects is required').not().isEmpty(),
  check('price', 'Price is required').not().isEmpty(),
  check('dosages', 'Dosages is required').not().isEmpty(),
  check('quantities', 'Quantities is required').not().isEmpty()
], createProduct)

// @route - GET /api/products/
// @desc - Fetch all products
// @method - Public
router.get('/', fetchAllProducts)

// @route - GET /api/products/
// @desc - Fetch all products
// @method - Public
router.get('/category/:categoryId', fetchAllProductsByCategory)

// @route - GET /api/products/:productId
// @desc - Fetch a product
// @method - Public
router.get('/:productId', fetchProductById)

// @route - PUT /api/products/:productId
// @desc - Update a product
// @method - Private (Both Auth and Admin)
router.put('/:productId', authenticate, isAdmin, upload.array('product-image', 3), [
  check('name', 'Name is required').not().isEmpty(),
  check('description', 'Description is required').not().isEmpty(),
  check('sideEffects', 'Side Effects is required').not().isEmpty(),
  check('price', 'Price is required').not().isEmpty(),
  check('dosages', 'Dosages is required').not().isEmpty(),
  check('quantities', 'Quantities is required').not().isEmpty()
], updateProductById)

// @route - PATCH /api/products/available/:productId
// @desc - Update a product's availability
// @method - Private (Both Auth and Admin)
router.patch('/available/:productId', check('status', 'Status is required').not().isEmpty(), updateProductAvailability)

// @route - DELETE /api/products/:productId
// @desc - Delete a product
// @method - Private (Both Auth and Admin)
router.delete('/:productId', authenticate, isAdmin, deleteProductById)

module.exports = router