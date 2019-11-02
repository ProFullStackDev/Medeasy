const { validationResult } = require('express-validator')
const Query = require('../models/Query')
const transporter = require('../utils/mailTransporter')

module.exports = {
	async fetchAllQueries(req, res) {
    try {
      const queries = await Query.find({}).sort('-createdAt')
      res.send({ statusCode: 200, queries })
    } catch (err) {
      res.status(500).send({ statusCode: 500, message: 'Server Error' })
    }
  },

	async addQuery(req, res) {
		const errros = validationResult(req)
		if (!errros.isEmpty())
			return res.status(400).send({ statusCode: 400, message: errros.array() })
		try {
      const { name, phoneNumber, message } = req.body
      const queryObj = { name, phoneNumber: `+1${phoneNumber}`, message }
			const query = await Query.create(queryObj)

			const modifiedPhoneNumber = `+1${phoneNumber.slice(0, 3)}-${phoneNumber.slice(3, 6)}-${phoneNumber.slice(6)}`
			// Construct email message
			const emailMessage = {
				from: process.env.EMAIL_ID,
				to: 'harishakira97@gmail.com',
				cc: ['sunguru98@yahoo.co.in'],
				envelope: {
					from: `MEDEASY <${process.env.EMAIL_ID}>`,
					to: 'harishakira97@gmail.com'
				},
				subject: 'You have a new query',
				html: `
          <h1>QUERY DETAILS</h1>
					<h2>Name: </h2><p>${name}</p><br />
					<h2>Phone: </h2><p><a href="tel:${modifiedPhoneNumber}">${modifiedPhoneNumber}</a></p><br/>
					<h2>Message: </h2><p>${message}</p>
          <br/><br/>
          <h4>With Regards</h4>
          <h3>Medeasy @ <a href='http://localhost:3000'>medeasy.com</a></h3>
        `
			}
			// Send the email message
			await transporter.sendMail(emailMessage)
			res.send({ statusCode: 201, query })
		} catch (err) {
			res.status(500).send({ statusCode: 500, message: 'Server Error' })
		}
	}
}
