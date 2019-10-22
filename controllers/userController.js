const bcrypt = require('bcryptjs')
const User = require('../models/User')
const Guest = require('../models/Guest')
const { validationResult } = require('express-validator')

module.exports = {
  
  createNewUser: async (req, res) => {
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
  },

  addGuestUser: async (req, res) => {
    try {
      const errors = validationResult(req)
      if (!errors.isEmpty()) return res.status(400).send({ statusCode: 400, message: errors.array() })
      let guest = await Guest.findOne({ email: req.body.email })
      if (guest) guest = await Guest.findOneAndUpdate({ email: req.body.email }, { $set: req.body }, { new: true })
      else guest = await Guest.create(req.body)
      res.send({ statusCode: 200, guest: guest._doc })
    } catch (err) {
      console.log(err.message)
      res.status(500).send({ statusCode: 500, message: 'Server Error' })
    }
  },
  
  signInUser: async (req, res) => {
    const { email, password } = req.body
    try {
      const user = await User.authenticateUser(email, password)
      const accessToken = await user.generateToken()
      res.send({ statusCode: 200, user, accessToken: `Bearer ${accessToken}`, expiresIn: '12h' })
    } catch (err) {
      console.log(err, err.message)
      res.status(401).send({ statusCode: 401, message: err.message })
    }
  },
  
  changeUserPassword: async (req, res) => {
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
  },

  signInAdminUser: async (req, res) => {
    const { email, password } = req.body
    try {
      const user = await User.authenticateUser(email, password)
      if (!user.isAdmin) return res.status(403).send({ statusCode: 403, message: 'You are not an admin' })
      const accessToken = await user.generateToken()
      res.send({ statusCode: 200, user, accessToken: `Bearer ${accessToken}`, expiresIn: '12h' })   
    } catch (err) {
      if (err.message === 'Incorrect credentials') return res.status(401).send({ statusCode: 401, message: err.message })
      res.status(500).send({ statusCode: 500, message: 'Server Error' })
    }
  },

  logoutUser: async (req, res) => {
    try {
      const user = req.user
      user.accessToken = null
      await user.save()
      res.status(202).send({ statusCode: 202, message: 'User logged out successfully' })
    } catch (err) {
      console.error(err.message)
      res.status(500).send({ statusCode: 500, message: 'Server Error' })
    }
  }

}