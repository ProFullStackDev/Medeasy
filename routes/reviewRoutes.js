const { Router } = require('express')
const { check } = require('express-validator')
const authenticate = require('../middleware/authenticate')

const router = Router()
const { getReviewsByProductId, postReviewForProduct } = require('../controllers/reviewController')

// @route - GET /api/reviews/:productId
// @desc - Fetch All reviews of a product
// @method - Public
router.get('/:productId', getReviewsByProductId)

// @route - POST /api/reviews/:productId
// @desc - Post a review on behalf of the product
// @method - Private (Auth)
router.post('/:productId', authenticate, [
  check('rating', 'Rating is required').not().isEmpty(),
  check('rating', 'Rating should be a number').isNumeric(),
  check('rating', 'Rating should be between 1 to 5').isFloat({ gt: 0, lt: 6 }),
  check('text', 'Text is required').not().isEmpty()
], postReviewForProduct)

module.exports = router