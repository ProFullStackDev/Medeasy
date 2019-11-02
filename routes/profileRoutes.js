const { Router } = require('express')
const router = Router()
const { check } = require('express-validator')

const authenticate = require('../middleware/authenticate')

const { addAddress, addCreditCard, fetchCreditCards, fetchAddresses, addProfile, editProfile } = require('../controllers/profileController')

// @route - POST /api/profile/address
// @desc - Add address
// @method - Private (Auth)
router.post('/address', authenticate, [
  check('name', 'First name is required').not().isEmpty(),
  check('mode', 'Address mode is required').not().isEmpty(),
  check('addressLine1', 'Shipping Address is required').not().isEmpty(),
  check('city', 'Shipping Address city is required').not().isEmpty(),
  check('state', 'Shipping Address state is required').not().isEmpty(),
  check('postalCode', 'Shipping Address postal code is required').not().isEmpty(),
  check('postalCode', 'Shipping Address postal must be a number').isNumeric(),
  check('postalCode', 'Shipping Address postal must be 5 digits long').isLength({ min: 5, max: 5 }),
  check('phNumber', 'Shipping Address phone number is required').not().isEmpty(),
  check('phNumber', 'Shipping Address phone number must be of numbers').isNumeric(),
  check('phNumber', 'Invalid Phone number').matches(/^(1\s?)?((\([0-9]{3}\))|[0-9]{3})[\s\-]?[\0-9]{3}[\s\-]?[0-9]{4}$/g)
], addAddress)

// @route - GET /api/profile/card
// @desc - Fetch user's cards
// @method - Private (Auth)
router.get('/card', authenticate, fetchCreditCards)

// @route - GET /api/profile/address
// @desc - Fetch user's addresses
// @method - Private (Auth)
router.get('/address', authenticate, fetchAddresses)

// @route - PUT /api/profile/card
// @desc - Add credit Card
// @method - Private (Auth)
router.put('/card', authenticate, [
  check('name', 'Name is required').not().isEmpty(),
  check('number', 'Number is required').not().isEmpty(),
  check('number', 'Invalid Card number').isNumeric(),
  check('number', 'Invalid Card number').isCreditCard(),
  check('expMonth', 'Expiry Month is required').not().isEmpty(),
  check('expMonth', 'Invalid expiry Month').isInt({ min: 1, max: 12 }),
  check('expMonth', 'Invalid expiry Month').isNumeric(),
  check('expYear', 'Expiry Year is required').not().isEmpty(),
  check('expYear', 'Invalid Expiry Year').isNumeric(),
  check('expYear', 'Invalid Expiry Year').isInt({ min: new Date().getFullYear(), max: 2050 }),
],
addCreditCard)

// router.post('/', authenticate, [
//   check('firstName', 'First name is required').not().isEmpty(),
//   check('lastName', 'First name is required').not().isEmpty(),
//   check('shippingAddress.mode', 'Address mode is required').not().isEmpty(),
//   check('shippingAddress.addressLine1', 'Shipping Address is required').not().isEmpty(),
//   check('shippingAddress.city', 'Shipping Address city is required').not().isEmpty(),
//   check('shippingAddress.state', 'Shipping Address state is required').not().isEmpty(),
//   check('shippingAddress.postalCode', 'Shipping Address postal code is required').not().isEmpty(),
//   check('shippingAddress.postalCode', 'Shipping Address postal must be a number').isNumeric(),
//   check('shippingAddress.postalCode', 'Shipping Address postal must be 5 digits long').isLength({ min: 5, max: 5 }),
//   check('shippingAddress.phNumber', 'Shipping Address phone number is required').not().isEmpty(),
//   check('shippingAddress.phNumber', 'Shipping Address postal must be a number').isNumeric(),
//   check('billingAddress.mode', 'Address mode is required').not().isEmpty(),
//   check('billingAddress.addressLine1', 'Billing Address  is required').not().isEmpty(),
//   check('billingAddress.city', 'Billing Address city is required').not().isEmpty(),
//   check('billingAddress.state', 'Billing Address state is required').not().isEmpty(),
//   check('billingAddress.postalCode', 'Billing Address postal code is required').not().isEmpty(),
//   check('billingAddress.postalCode', 'Billing Address postal must be a number').isNumeric(),
//   check('billingAddress.postalCode', 'Billing Address postal must be 5 digits long').isLength({ min: 5, max: 5 }),
//   check('billingAddress.phNumber', 'Billing Address phone number is required').not().isEmpty(),
//   check('billingAddress.phNumber', 'Billing Address postal must be a number').isNumeric(),
// ], addProfile)

// @route - PUT /api/profile/:addressId
// @desc - Edit profile
// @method - Private (Auth)
router.put('/:addressId', authenticate, editProfile)

module.exports = router