const jwt = require('jsonwebtoken')
const User = require('../models/User')

const authenticate = async (req, res, next) => {
  const accessToken = req.header('Authorization')
  if (!accessToken) throw new Error('No token')
  try {
    const payload = await jwt.verify(accessToken, process.env.JWT_SECRET_KEY)
    const user = User.findOne({ _id: payload.id, accessToken })
    if (!user) throw new Error('No user')
    req.user = user
    req.accessToken = accessToken
    next()
  } catch (err) {
    console.log(err.message)
    res.status(401).send({ statusCode: 401, message: 'Incorrect Credentials' })
  }
}

module.exports = authenticate