const { Router } = require('express')
const router = Router()
const { createRazorpayCharge } = require('../controllers/paymentController')

// @route - POST /api/payments/razorpay/charge
// @desc - Charge a payment on razorpay
// @method - Public
router.post('/razorpay/charge', createRazorpayCharge)

// @route - POST /api/payments/paypal/charge
// @desc - Charge a payment on paypal
// @method - Public

module.exports = router