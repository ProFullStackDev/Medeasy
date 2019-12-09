const { validationResult } = require('express-validator')
const Affliate = require('../models/Affliate')

module.exports = {
  async addAffliate(req, res) {
    try {
      const errors = validationResult(req)
      if (!errors.isEmpty())
        return res
          .status(400)
          .send({ statusCode: 400, message: errors.array() })
      const affliate = new Affliate(req.body)
      await affliate.save()
      res.status(201).send({ statusCode: 201, affliate })
    } catch (err) {
      res.status(500).send({ statusCode: 500, message: 'Server Error' })
    }
  }
}
