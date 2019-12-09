const { validationResult } = require('express-validator')
const Affliate = require('../models/Affliate')
const createTransporter = require('../utils/mailTransporter')

module.exports = {
  async addAffliate(req, res) {
    try {
      const errors = validationResult(req)
      if (!errors.isEmpty())
        return res
          .status(400)
          .send({ statusCode: 400, message: errors.array() })
      const { name, email, country, comment } = req.body
      const affliate = new Affliate(req.body)
      await affliate.save()
      const transporter = createTransporter(process.env.CONTACT_EMAIL_ID)
      const message = {
        from: process.env.CONTACT_EMAIL_ID,
        to: ['harishakira97@gmail.com', 'sandy@medeasyonline.com'],
        subject: 'A new affiliate request',
        html: `
          <h1>You have a new Affiliate Request</h1><br/>
          <h2>Name: ${name}</h2>
          <h2>Email: ${email}</h2>
          <h2>Country: ${country}</h2>
          <h2>Comment: ${comment}</h2>
          <br />
        `
      }
      await transporter.sendMail(message)
      res.status(201).send({ statusCode: 201, affliate })
    } catch (err) {
      res.status(500).send({ statusCode: 500, message: 'Server Error' })
    }
  }
}
