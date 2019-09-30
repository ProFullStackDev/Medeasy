const { Router } = require('express')
const router = Router()
const { check, validationResult } = require('express-validator')

const authenticate = require('../middleware/authenticate')
const Profile = require('../models/Profile')

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
], async (req, res) => {
  const user = req.user
  try {
    const errors = validationResult(req)
    if (!errors.isEmpty()) return res.status(400).send({ statusCode: 400, message: errors.array() })
    let profile = await Profile.findOne({ user: user._id })
    if (profile) {
      profile = await profile.populate('user', ['email']).execPopulate()
      return res.send({ statusCode: 200, profile })
    }
    profile = new Profile({ firstName: req.body.firstName, middleName: req.body.middleName, lastName: req.body.lastName, addresses: [req.body.shippingAddress, req.body.billingAddress]})
    profile.user = user._id
    await profile.save()
    profile = await profile.populate('user', ['email']).execPopulate()
    res.status(201).send({ statusCode: 201, profile })
  } catch (err) {
    console.log(err.message)
    res.status(500).send({ statusCode: 500, message: 'Server Error' })
  }
})

// @route - PUT /api/profile/:addressId
// @desc - Edit profile
// @method - Private (Auth)
router.put('/:addressId', authenticate, async (req, res) => {
  const { addressId } = req.params
  if (!addressId) return res.status(400).send({ statusCode: 400, message: 'Address Id not found' })
  try {
    const profile = await Profile.findOne({ user: req.user._id })
    const addressIndex = profile.addresses.findIndex(add => add._id.toString() === addressId)
    if (addressIndex === -1) return res.status(404).send({ statusCode: 404, message: 'Address Id not found' })
    profile.addresses[addressIndex] = req.body
    await profile.save()
    return res.status(202).send({ statusCode: 202, profile })
  } catch (err) {
    console.error(err.message)
    if (err.name === 'CastError') return res.status(400).send({ statusCode: 400, message: 'Invalid Address Id' })
    res.status(500).send({ statusCode: 500, message: 'Server Error' })
  }
})

module.exports = router