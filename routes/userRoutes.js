const { check } = require('express-validator')
const { Router } = require('express')
const authenticate = require('../middleware/authenticate')
const isAdmin = require('../middleware/isAdmin')
const router = Router()
const { logoutUser, createNewUser, addGuestUser, signInUser, changeUserPassword, signInAdminUser } = require('../controllers/userController')

// @route - POST /api/user
// @desc - Add a new user
// @method - Public
router.post('/', [
  check('email', 'Email is required').not().isEmpty(),
  check('email', 'Invalid email').isEmail(),
  check('password', 'Password is required').not().isEmpty(),
  check('password', 'Password must contain atleast a single number').isAlphanumeric(),
  check('password', 'Password should contain minimum 8 characters').isLength({ min: 8 })
], createNewUser)

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
  ], addGuestUser)

// @route - GET /api/user
// @desc - Login a user
// @method - Public
router.get('/', [check('email', 'Email is required').not().isEmpty(), check('password', 'Password is required').not().isEmpty()], signInUser)

// @route - POST /api/user/admin
// @desc - Login a admin user
// @method - Public
router.post('/admin', [check('email', 'Email is required').not().isEmpty(), check('password', 'Password is required').not().isEmpty()], signInAdminUser)

// @route - PATCH /api/user/password
// @desc - Change User Password
// @method - Private (Auth)
router.patch('/password', authenticate, changeUserPassword)

// @route - PUT /api/user/password
// @desc - Logout
// @method - Public
router.put('/password', check('accessToken', 'Access Token is required').not().isEmpty(), logoutUser)

// @route - GET /api/user/verify/admin
// @desc - Verify JWT for Admin
// @method - Private (Auth and Admin)
router.get('/verify/admin', authenticate, isAdmin, (req, res) => res.sendStatus(200))

module.exports = router