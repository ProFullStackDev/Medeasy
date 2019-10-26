const { Router } = require('express')
const { check } = require('express-validator')
const router = Router()

const authenticate = require('../middleware/authenticate')
const isAdmin = require('../middleware/isAdmin')

const { fetchAllCategories, fetchCategoryById, createCategory, updateCategoryById, deleteCategoryById } = require('../controllers/categoryController')

// @route - GET /api/categories
// @desc - Fetch All categories
// @method - Public
router.get('/', fetchAllCategories)

// @route - POST /api/categories
// @desc - Create category
// @method - Private (Auth and Admin)
router.post('/', authenticate, isAdmin,[
  check('name', 'Name is required').not().isEmpty(),
  check('description', 'Description is required').not().isEmpty()
], createCategory)

// @route - GET /api/categories/:categoryId
// @desc - Fetch category by ID
// @method - Public
router.get('/:categoryId', fetchCategoryById)

// @route - PUT /api/categories/:categoryId
// @desc - Update Category
// @method - Private (Auth and isAdmin)
router.put('/:categoryId', authenticate, isAdmin, updateCategoryById)

// @route - DELETE /api/categories/:categoryId
// @desc - Delete Category
// @method - Private (Auth and isAdmin)
router.delete('/:categoryId', authenticate, isAdmin, deleteCategoryById)

module.exports = router