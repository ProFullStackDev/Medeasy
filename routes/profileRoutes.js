const { Router } = require('express')
const router = Router()
const { check } = require('express-validator')

const authenticate = require('../middleware/authenticate')

const { addProfile, editProfile } = require('../controllers/profileController')

// @route - POST /api/profile
// @desc - Add profile
// @method - Private (Auth)
router.post('/', authenticate, [
  check('firstName', 'First name is required').not().isEmpty(),
  check('lastName', 'First name is required').not().isEmpty(),
  check('shippingAddress.mode', 'Address mode is required').not().isEmpty(),
  check('shippingAddress.addressLine1', 'Shipping Address is required').not().isEmpty(),
  check('shippingAddress.city', 'Shipping Address city is required').not().isEmpty(),
  check('shippingAddress.state', 'Shipping Address state is required').not().isEmpty(),
  check('shippingAddress.postalCode', 'Shipping Address postal code is required').not().isEmpty(),
  check('shippingAddress.postalCode', 'Shipping Address postal must be a number').isNumeric(),
  check('shippingAddress.postalCode', 'Shipping Address postal must be 5 digits long').isLength({ min: 5, max: 5 }),
  check('shippingAddress.phNumber', 'Shipping Address phone number is required').not().isEmpty(),
  check('shippingAddress.phNumber', 'Shipping Address postal must be a number').isNumeric(),
  check('billingAddress.mode', 'Address mode is required').not().isEmpty(),
  check('billingAddress.addressLine1', 'Billing Address  is required').not().isEmpty(),
  check('billingAddress.city', 'Billing Address city is required').not().isEmpty(),
  check('billingAddress.state', 'Billing Address state is required').not().isEmpty(),
  check('billingAddress.postalCode', 'Billing Address postal code is required').not().isEmpty(),
  check('billingAddress.postalCode', 'Billing Address postal must be a number').isNumeric(),
  check('billingAddress.postalCode', 'Billing Address postal must be 5 digits long').isLength({ min: 5, max: 5 }),
  check('billingAddress.phNumber', 'Billing Address phone number is required').not().isEmpty(),
  check('billingAddress.phNumber', 'Billing Address postal must be a number').isNumeric(),
], addProfile)

// @route - PUT /api/profile/:addressId
// @desc - Edit profile
// @method - Private (Auth)
router.put('/:addressId', authenticate, editProfile)

module.exports = router