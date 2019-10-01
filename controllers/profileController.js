const { validationResult } = require('express-validator')
const Profile = require('../models/Profile')

module.exports = {
  addProfile: async (req, res) => {
    const user = req.user
    try {
      const errors = validationResult(req)
      if (!errors.isEmpty())
        return res
          .status(400)
          .send({ statusCode: 400, message: errors.array() })
      let profile = await Profile.findOne({ user: user._id })
      if (profile) {
        profile = await profile.populate('user', ['email']).execPopulate()
        return res.send({ statusCode: 200, profile })
      }
      profile = new Profile({
        firstName: req.body.firstName,
        middleName: req.body.middleName,
        lastName: req.body.lastName,
        addresses: [req.body.shippingAddress, req.body.billingAddress]
      })
      profile.user = user._id
      await profile.save()
      profile = await profile.populate('user', ['email']).execPopulate()
      res.status(201).send({ statusCode: 201, profile })
    } catch (err) {
      console.log(err.message)
      res.status(500).send({ statusCode: 500, message: 'Server Error' })
    }
  },
  editProfile: async (req, res) => {
    const { addressId } = req.params
    if (!addressId)
      return res
        .status(400)
        .send({ statusCode: 400, message: 'Address Id not found' })
    try {
      const profile = await Profile.findOne({ user: req.user._id })
      const addressIndex = profile.addresses.findIndex(
        add => add._id.toString() === addressId
      )
      if (addressIndex === -1)
        return res
          .status(404)
          .send({ statusCode: 404, message: 'Address Id not found' })
      profile.addresses[addressIndex] = req.body
      await profile.save()
      return res.status(202).send({ statusCode: 202, profile })
    } catch (err) {
      console.error(err.message)
      if (err.name === 'CastError')
        return res
          .status(400)
          .send({ statusCode: 400, message: 'Invalid Address Id' })
      res.status(500).send({ statusCode: 500, message: 'Server Error' })
    }
  }
}
