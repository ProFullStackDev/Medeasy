const { Router } = require('express')
const { check } = require('express-validator')
const router = Router()
const {
  fetchAllQueries,
  addQuery,
  submitTabletRequest
} = require('../controllers/queryController')

// @route - GET /api/queries
// @desc - Fetch All queries
// @method - Public
router.get('/', fetchAllQueries)

// @route - POST /api/queries
// @desc - Submit a query
// @method - Public
router.post(
  '/',
  [
    check('name', 'Name is required')
      .not()
      .isEmpty(),
    check('phoneNumber', 'Phone number is required')
      .not()
      .isEmpty(),
    check('email', 'Email is required')
      .not()
      .isEmpty(),
    check('phoneNumber', 'Invalid Phone number').matches(
      /^(1\s?)?((\([0-9]{3}\))|[0-9]{3})[\s\-]?[\0-9]{3}[\s\-]?[0-9]{4}$/g
    )
  ],
  addQuery
)

// @route - POST /api/queries/tablet
// @desc - Submit a tablet request
// @method - Public
router.post(
  '/tablet',
  check('tabletRequest', 'Tablet request is required'),
  submitTabletRequest
)

module.exports = router
