const { Router } = require('express')
const router = Router()
const { check } = require('express-validator')
const authenticate = require('../middleware/authenticate')
const isAdmin = require('../middleware/isAdmin')
const { createCoupon, fetchAllCoupons, deleteCouponById, fetchCouponById, updateCouponById } = require('../controllers/couponController')

// @route - POST api/coupons
// @desc - Create a new coupon
// @method - Private (Both Auth and Admin)
router.post('/', authenticate, isAdmin, [
  check('name', 'Name is required').not().isEmpty(),
  check('type', 'Type is required').not().isEmpty(),
  check('description', 'Description is required').not().isEmpty(),
  check('minimumOrderAmount', 'Minimum Order Amount is required').not().isEmpty(),
  check('minimumOrderAmount', 'Minimum Order Amount should be a number').isNumeric(),
  check('value', 'Value is required').not().isEmpty(),
  check('expiresAt', 'Expiry Date is required').not().isEmpty()
],
createCoupon)

// @route - GET api/coupons
// @desc - Get all coupons
// @method - Public
router.get('/', fetchAllCoupons)

// @route - GET api/coupons/:couponId
// @desc - Get coupon by ID
// @method - Private (Both Auth and Admin)
router.get('/:couponId', authenticate, isAdmin, fetchCouponById)

// @route - PUT api/coupons/:couponId
// @desc - Update a coupon by ID
// @method - Private (Both Auth and Admin)
router.put('/:couponId', authenticate, isAdmin, [
  check('name', 'Name is required').not().isEmpty(),
  check('type', 'Type is required').not().isEmpty(),
  check('description', 'Description is required').not().isEmpty(),
  check('value', 'Value is required').not().isEmpty(),
  check('minimumOrderAmount', 'Minimum Order Amount is required').not().isEmpty(),
  check('minimumOrderAmount', 'Minimum Order Amount should be a number').isNumeric(),
  check('expiresAt', 'Expiry Date is required').not().isEmpty()
], updateCouponById)

// @route - DELETE api/coupons/:couponId
// @desc - Delete a coupon by ID
// @method - Private (Both Auth and Admin)
router.delete('/:couponId', authenticate, isAdmin, deleteCouponById)

module.exports = router