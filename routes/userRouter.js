const { check, validationResult } = require('express-validator')
const { Router } = require('express')
const bcrypt = require('bcryptjs')

const authenticate = require('../middleware/authenticate')
const User = require('../models/User')
const Guest = require('../models/Guest')
const router = Router()

// @route - POST /api/user
// @desc - Add a new user
// @method - Public
router.post('/', [
  check('email', 'Email is required').not().isEmpty(),
  check('email', 'Invalid email').isEmail(),
  check('password', 'Password is required').not().isEmpty(),
  check('password', 'Password must contain atleast a single number').isAlphanumeric(),
  check('password', 'Password should contain minimum 8 characters').isLength({ min: 8 })
],
  async (req, res) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) return res.status(400).send({ statusCode: 400, message: errors.array() })
    const { email, password } = req.body
    try {
      let user = await User.findOne({ email })
      if (user) return res.status(400).send({ statusCode: 400, message: 'Email already exists' })
      user = await User.create({ email, password })
      const accessToken = await user.generateToken()
      res.send({ statusCode: 200, user, accessToken: `Bearer ${accessToken}`, expiresIn: '12h' })
    } catch (err) {
      console.error(err.message)
      res.status(500).send({ statusCode: 400, message: 'Server Error' })
    }
  }
)

// @route - POST /api/user/guest
// @desc - Add a new guest user
// @method - Public
router.post('/guest', [
    check('name', 'Name is required').not().isEmpty(),
    check('email', 'Email is required').not().isEmpty(),
    check('baddressLine1', 'Billing Address is required').not().isEmpty(),
    check('bcity', 'Billing Address city is required').not().isEmpty(),
    check('bstate', 'Billing Address state is required').not().isEmpty(),
    check('bpostalCode', 'Billing Address postal code is required').not().isEmpty(),
    check('bphNumber', 'Billing Address phone number is required').not().isEmpty(),
    check('saddressLine1', 'Shipping Address is required').not().isEmpty(),
    check('scity', 'Shipping Address city is required').not().isEmpty(),
    check('sstate', 'Shipping Address state is required').not().isEmpty(),
    check('spostalCode', 'Shipping Address postal code is required').not().isEmpty(),
    check('sphNumber', 'Shipping Address phone number is required').not().isEmpty()
  ],
  async (req, res) => {
    try {
      let guest = await Guest.findOne({ email: req.body.email })
      if (guest) guest = await Guest.findOneAndUpdate({ email: req.body.email }, { $set: req.body }, { new: true })
      else guest = await Guest.create(req.body)
      res.send({ statusCode: 200, guest: guest._doc })
    } catch (err) {
      res.status(500).send({ statusCode: 500, message: 'Server Error' })
    }
  }
)

// @route - GET /api/user
// @desc - Login a user
// @method - Public
router.get('/', [check('email', 'Email is required').not().isEmpty(), check('password', 'Password is required').not().isEmpty()], async (req, res) => {
  console.log('asds')
  const { email, password } = req.body
  try {
    const user = await User.authenticateUser(email, password)
    const accessToken = await user.generateToken()
    res.send({ statusCode: 200, user, accessToken: `Bearer ${accessToken}`, expiresIn: '12h' })
  } catch (err) {
    console.log(err.message)
    res.status(401).send({ statusCode: 401, message: err.message })
  }
})

// @route - PATCH /api/user/password
// @desc - Change User Password
// @method - Private (Auth)
router.patch('/password', authenticate, async (req, res) => {
  let user = req.user
  const { password, newPassword } = req.body
  if (!password) return res.status(400).send({ statusCode: 400, message: 'Old / Current password is required' })
  if (password === newPassword) return res.status(400).send({ statusCode: 400, message: 'Bad Request' })
  try {
    const isMatched = await bcrypt.compare(password, user.password)
    if (!isMatched) return res.status(401).send({ statusCode: 401, message: 'Invalid Authentication' })
    user = await User.findById(user._id)
    user.password = newPassword
    user = await user.save()
    res.status(202).send({ statusCode: 202, message: 'Password changed successfully' })
  } catch (err) {
    console.error(err)
    res.status(500).send({ statusCode: 500, message: 'Server Error' })
  }
})

module.exports = router