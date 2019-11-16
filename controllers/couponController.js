const { validationResult } = require('express-validator')
const Coupon = require('../models/Coupon')

module.exports = {
  createCoupon: async (req, res) => {
    const errors = validationResult(req)
    if (!errors.isEmpty())
      return res.status(400).send({ statusCode: 400, message: errors.array() })
    try {
      let coupon = await Coupon.findOne({
        name: req.body.name,
        value: req.body.value
      })
      if (coupon) return res.send({ statusCode: 200, coupon })
      coupon = await Coupon.create(req.body)
      res.status(201).send({ statusCode: 201, coupon })
    } catch (err) {
      console.error(err.message)
      res.status(500).send({ statusCode: 500, message: 'Server Error' })
    }
  },

  fetchAllCoupons: async (req, res) => {
    try {
      const coupons = await Coupon.find({
        expiresAt: { $gt: new Date().getTime() }
      }).sort('-createdAt')
      res.send({ statusCode: 200, coupons })
    } catch (err) {
      console.error(err.message)
      res.status(500).send({ statusCode: 500, message: 'Server Error' })
    }
  },

  deleteCouponById: async (req, res) => {
    const errors = validationResult(req)
    if (!errors.isEmpty())
      return res.status(400).send({ statusCode: 400, message: errors.array() })
    try {
      const couponId = req.params.couponId
      if (!couponId)
        return res
          .status(400)
          .send({ statusCode: 400, message: 'Coupon Id required' })
      const coupon = await Coupon.findByIdAndDelete(couponId)
      if (!coupon)
        return res
          .status(404)
          .send({ statusCode: 404, message: 'Coupon does not exist' })
      res.status(202).send({ statusCode: 202, coupon })
    } catch (err) {
      console.log(err.message)
      if (err.name === 'CastError')
        return res
          .status(400)
          .send({ statusCode: 400, message: 'Invalid Coupon Id' })
      res.status(500).send({ statusCode: 500, message: 'Server Error' })
    }
  },

  fetchCouponById: async (req, res) => {
    const errors = validationResult(req)
    if (!errors.isEmpty())
      return res.status(400).send({ statusCode: 400, message: errors.array() })
    try {
      const couponId = req.params.couponId
      if (!couponId)
        return res
          .status(400)
          .send({ statusCode: 400, message: 'Coupon Id required' })
      const coupon = await Coupon.findById(couponId)
      if (!coupon)
        return res
          .status(404)
          .send({ statusCode: 404, message: 'Coupon does not exist' })
      res.send({ statusCode: 202, coupon })
    } catch (err) {
      if (err.name === 'CastError')
        return res
          .status(400)
          .send({ statusCode: 400, message: 'Invalid Coupon Id' })
      res.status(500).send({ statusCode: 500, message: 'Server Error' })
    }
  },

  updateCouponById: async (req, res) => {
    const errors = validationResult(req)
    if (!errors.isEmpty())
      return res.status(400).send({ statusCode: 400, message: errors.array() })
    try {
      const couponId = req.params.couponId
      if (!couponId)
        return res
          .status(400)
          .send({ statusCode: 400, message: 'Coupon Id required' })
      const coupon = await Coupon.findByIdAndUpdate(req.body)
      if (!coupon)
        return res
          .status(404)
          .send({ statusCode: 404, message: 'Coupon does not exist' })
      res.send({ statusCode: 202, coupon })
    } catch (err) {
      if (err.name === 'CastError')
        return res
          .status(400)
          .send({ statusCode: 400, message: 'Invalid Coupon Id' })
      res.status(500).send({ statusCode: 500, message: 'Server Error' })
    }
  }
}
