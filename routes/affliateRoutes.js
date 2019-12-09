const { Router } = require('express')
const { check } = require('express-validator')
const router = Router()

// @route - POST api/affliates
// @desc - Create Affliate
// @method - Public

router.post('/', [
  check('name', 'Name is required')
    .not()
    .isEmpty(),
  check('email', 'Email is required')
    .not()
    .isEmpty(),
  check('email', 'Invalid Email').isEmail(),
  check('companyName', 'Company name is required')
    .not()
    .isEmpty(),
  check('city', 'city is required')
    .not()
    .isEmpty(),
  check('street', 'street is required')
    .not()
    .isEmpty(),
  check('country', 'country is required')
    .not()
    .isEmpty(),
  check('comment', 'comment is required')
    .not()
    .isEmpty(),
  check('state', 'state is required')
    .not()
    .isEmpty(),
  check('postalCode', 'postal code is required')
    .not()
    .isEmpty(),
  check('postalCode', 'postal must be a number').isNumeric(),
  check('postalCode', 'Invalid Postal code').isLength({
    min: 5,
    max: 6
  })
])

module.exports = router
