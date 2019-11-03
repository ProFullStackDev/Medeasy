const User = require('../models/User')
const Guest = require('../models/Guest')

const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
const { validationResult } = require('express-validator')

const transporter = require('../utils/mailTransporter')

module.exports = {
	createNewUser: async (req, res) => {
		const errors = validationResult(req)
		if (!errors.isEmpty())
			return res.status(400).send({ statusCode: 400, message: errors.array() })
		const { email, password, name } = req.body
		try {
			let user = await User.findOne({ email })
			if (user)
				return res
					.status(400)
					.send({ statusCode: 400, message: 'Email already exists' })
			user = await User.create({ email, password, name })
			const accessToken = await user.generateToken()
			res.send({
				statusCode: 200,
				user,
				accessToken: `Bearer ${accessToken}`,
				expiresIn: '12h'
			})
		} catch (err) {
			console.error(err.message)
			res.status(500).send({ statusCode: 400, message: 'Server Error' })
		}
	},

	addGuestUser: async (req, res) => {
		try {
			const errors = validationResult(req)
			if (!errors.isEmpty())
				return res
					.status(400)
					.send({ statusCode: 400, message: errors.array() })
			let guest = await Guest.findOne({ email: req.body.email })
			if (guest)
				guest = await Guest.findOneAndUpdate(
					{ email: req.body.email },
					{ $set: req.body },
					{ new: true }
				)
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
			res.send({
				statusCode: 200,
				user,
				accessToken: `Bearer ${accessToken}`,
				expiresIn: '12h'
			})
		} catch (err) {
			console.log(err, err.message)
			res
				.status(401)
				.send({ statusCode: 401, message: err.message, method: 'signin' })
		}
	},

	changeUserPassword: async (req, res) => {
		const errors = validationResult(req)
		if (!errors.isEmpty())
			return res.status(400).send({ statusCode: 400, message: errors.array() })
		const { oldPassword, newPassword } = req.body
		if (oldPassword === newPassword)
			return res.status(400).send({ statusCode: 400, message: 'Password should not be as previous one' })
		try {
			const user = await User.findById(req.user._id)
			const isMatched = await bcrypt.compare(oldPassword, user.password)
			if (!isMatched)
				return res
					.status(401)
					.send({ statusCode: 401, message: 'Incorrect password', method: 'change-password' })
			user.password = newPassword
			await user.save()
			res
				.status(202)
				.send({ statusCode: 202, message: 'Password changed successfully' })
		} catch (err) {
			console.error(err)
			res.status(500).send({ statusCode: 500, message: 'Server Error' })
		}
	},

	sendResetPasswordEmail: async (req, res) => {
		const errors = validationResult(req)
		if (!errors.isEmpty())
			return res.status(400).send({ statusCode: 400, message: errors.array() })
		try {
			const { email: requestedEmail } = req.body
			const user = await User.findOne({ email: requestedEmail })
			if (!user)
				return res.status(400).send({
					statusCode: 400,
					message: 'Email does not exist. Please register first'
				})

			if (user.isAdmin)
				return res.status(403).send({ statusCode: 403, message: 'Forbidden' })
			// Create email transporter (Change with Medeasy's)
			

			// Generate token (expires at 15 minutes)
			const jwtSecret = user._id + '-' + new Date(user.createdAt).getTime()
			const payload = { id: user._id, email: user.email }
			const passwordResetToken = await jwt.sign(payload, jwtSecret, {
				expiresIn: (60 * 60) / 4
			})

			// Start the expiry Timer and token here
			user.passwordResetToken = passwordResetToken
			user.passwordResetExpires = Date.now() + (60 * 60 * 1000) / 4 // 15 minutes
			await user.save()

			// Construct email message
			const message = {
				from: process.env.EMAIL_ID,
				to: requestedEmail,
				envelope: {
					from: `MEDEASY <${process.env.EMAIL_ID}>`,
					to: requestedEmail
				},
				subject: 'Password reset Email',
				html: `
          <h1>Request for password reset</h1>
          <p>
            You are receiving this email, because you (or someone else) have requested to rest your password. <br/>
            Please click the following link below or copy and paste the link in your browser to complete the process. <br/> Please note that, this link will be valid for only 15 minutes.
          <p>
          <p>http://localhost:3000/password/reset/${passwordResetToken}</p><br />
          <p>If you did not raise this request means, kindly ignore the email</p>
          <br/><br/>
          <h4>With Regards</h4>
          <h3>Medeasy @ <a href='http://localhost:3000'>medeasy.com</a></h3>
        `
			}

			// Send the email message
			const response = await transporter.sendMail(message)
			res.send({ statusCode: 200, response })
		} catch (err) {
			console.log(err)
			res.status(500).send({ statusCode: 500, message: 'Server Error' })
		}
	},

	verifyPasswordToken: async (req, res) => {
		const errors = validationResult(req)
		if (!errors.isEmpty())
			return res.status(400).send({ statusCode: 400, message: errors.array() })
		try {
			const { passwordResetToken } = req.body
			// Verify the token
			const user = await User.findOne({
				passwordResetToken,
				passwordResetExpires: { $gt: Date.now() }
			})
			if (!user)
				return res.status(404).send({
					statusCode: 404,
					message: 'User does not exist'
				})

			const isVerified = await jwt.verify(
				passwordResetToken,
				`${user._id}-${new Date(user.createdAt).getTime()}`
			)
			if (!isVerified)
				return res
					.status(400)
					.send({ statusCode: 400, message: 'Invalid / Expired Token' })
			// If exists means send valid response
			res.status(202).send({
				statusCode: 202,
				message: 'Token is valid',
				email: user.email
			})
		} catch (err) {
			console.log(err)
			res.status(500).send({ statusCode: 500, message: 'Server Error' })
		}
	},

	resetPassword: async (req, res) => {
		const errors = validationResult(req)
		if (!errors.isEmpty())
			return res.status(400).send({ statusCode: 400, message: errors.array() })

		try {
			const { email, newPassword } = req.body
			const user = await User.findOne({ email })
			if (!user)
				return res
					.status(404)
					.send({ statusCode: 404, message: 'User not found' })

			// Change the password and nullify both the token and time
			user.password = newPassword
			user.passwordResetExpires = null
			user.passwordResetToken = null
			await user.save()

			res.send({ statusCode: 200, message: 'Password successfully reset' })
		} catch (err) {
			res.status(500).send({ statusCode: 500, message: 'Server Error' })
		}
	},

	signInAdminUser: async (req, res) => {
		const { email, password } = req.body
		try {
			const user = await User.authenticateUser(email, password)
			if (!user.isAdmin)
				return res
					.status(403)
					.send({
						statusCode: 403,
						message: 'You are not an admin',
						method: 'signin'
					})
			const accessToken = await user.generateToken()
			res.send({
				statusCode: 200,
				user,
				accessToken: `Bearer ${accessToken}`,
				expiresIn: '12h'
			})
		} catch (err) {
			if (err.message === 'Incorrect credentials')
				return res
					.status(401)
					.send({ statusCode: 401, message: err.message, method: 'signin' })
			res.status(500).send({ statusCode: 500, message: 'Server Error' })
		}
	},

	logoutUser: async (req, res) => {
		try {
			const errors = validationResult(req)
			if (!errors.isEmpty())
				return res
					.status(400)
					.send({ statusCode: 400, message: errors.array() })
			const { accessToken } = req.body
			const user = await User.findOne({
				accessToken: accessToken.replace('Bearer ', '')
			})
			user.accessToken = null
			await user.save()
			res
				.status(202)
				.send({ statusCode: 202, message: 'User logged out successfully' })
		} catch (err) {
			console.error(err.message)
			res.status(500).send({ statusCode: 500, message: 'Server Error' })
		}
	}
}
