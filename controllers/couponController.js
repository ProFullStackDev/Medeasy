const { validationResult } = require('express-validator')
const Coupon = require('../models/Coupon')

module.exports = {
  createCoupon: async (req, res) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) return res.status(400).send({ statusCode: 400, message: errors.array() })
    try {
      const coupon = await Coupon.create(req.body)
      res.status(201).send({ statusCode: 201, coupon })
    } catch (err) {
      console.error(err.message)
      res.status(500).send({ statusCode: 500, message: 'Server Error'})
    }
  }
}