const { Router } = require('express')
const router = Router()
const { check } = require('express-validator')
const authenticate = require('../middleware/authenticate')
const isAdmin = require('../middleware/isAdmin')
const { createCoupon, fetchAllCoupons, deleteCouponById } = require('../controllers/couponController')

// @route - POST api/coupons
// @desc - Create a new coupon
// @method - Private (Both Auth and Admin)
router.post('/', authenticate, isAdmin, [
  check('name', 'Name is required').not().isEmpty(),
  check('type', 'Type is required').not().isEmpty(),
  check('description', 'Description is required').not().isEmpty(),
  check('value', 'Value is required').not().isEmpty(),
  check('expiresAt', 'Expiry Date is required').not().isEmpty()
],
createCoupon)

// @route - GET api/coupons
// @desc - Get all coupons
// @method - Private (Both Auth and Admin)
router.get('/', authenticate, isAdmin, fetchAllCoupons)

// @route - DELETE api/coupons/:couponId
// @desc - Delete a coupon by ID
// @method - Private (Both Auth and Admin)
router.delete('/:couponId', authenticate, isAdmin, deleteCouponById)

module.exports = router