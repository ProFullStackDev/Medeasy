const { validationResult } = require('express-validator')
const Profile = require('../models/Profile')

module.exports = {
	addAddress: async (req, res) => {
		const user = req.user
		try {
			const errors = validationResult(req)
			if (!errors.isEmpty())
				return res
					.status(400)
					.send({ statusCode: 400, message: errors.array() })

			const {
				name,
				mode,
				addressLine1,
				addressLine2,
				city,
				state,
				postalCode,
				country,
				phNumber,
				faxNumber
			} = req.body
			let profile = await Profile.findOne({ user: user._id }).populate('user', [
				'name',
				'email'
			])

			if (profile) {
				profile.addresses.push(req.body)
				await profile.save()
				return res.send({ statusCode: 200, profile })
			}

			const profileObj = {
				name,
				mode,
				addressLine1,
				addressLine2,
				city,
				state,
				postalCode,
				country,
				phNumber: `+1${phNumber}`,
				faxNumber,
				addresses: [],
				cards: []
			}
			profile = new Profile(profileObj)
			profile.user = user._id
			profile.addresses.push(profileObj)

			await profile.save()
			profile = await profile.populate('user', ['name', 'email']).execPopulate()
			res.status(201).send({ statusCode: 201, profile })
		} catch (err) {
			res.status(500).send({ statusCode: 500, message: 'Server Error' })
		}
	},

	async addCreditCard(req, res) {
		const user = req.user
		try {
			const errors = validationResult(req)
			if (!errors.isEmpty())
				return res
					.status(400)
					.send({ statusCode: 400, message: errors.array() })

			const { name, number, expMonth, expYear } = req.body
			const profile = await Profile.findOne({ user: user._id })
			if (!profile)
				res.status(404).send({ statusCode: 404, message: 'Profile not found' })

			let cardSystem = null
			switch (String(number)[0]) {
				case '3':
					cardSystem = 'American Express / Diners Club'
					break
				case '4':
					cardSystem = 'Visa'
					break
				case '5':
					cardSystem = 'MasterCard'
					break
				case '6':
					cardSystem = 'Discover'
					break
			}

			const creditCardObj = {
				cardSystem,
				cardName: name,
				cardNumber: number,
				cardExpiryMonth: expMonth,
				cardExpiryYear: parseInt(expYear) - 2000
			}

			profile.creditCards.push(creditCardObj)
			await profile.save()
			res.status(202).send({ statusCode: 202, cards: profile.creditCards })
		} catch (err) {
			res.status(500).send({ statusCode: 500, message: 'Server Error' })
		}
	},

	async fetchCreditCards(req, res) {
		try {
			const errors = validationResult(req)
			if (!errors.isEmpty())
				return res
					.status(400)
					.send({ statusCode: 400, message: errors.array() })
			const profile = await Profile.findOne({ user: req.user._id })
			if (!profile) return res.send({ statusCode: 200, cards: [] })
			const modifiedCards = profile.creditCards.map(({ _id, cardNumber, cardSystem, cardName, cardExpiryMonth, cardExpiryYear }) => {
				return { _id, hidNum: cardNumber, cardNumber: `XXXX   XXXX   XXXX   ${String(cardNumber).substr(String(cardNumber).length - 4)}`, cardName, cardSystem, cardExpiryYear, cardExpiryMonth }
			})
			res.send({ statusCode: 200, cards: modifiedCards })
		} catch (err) {
			res.status(500).send({ statusCode: 500, message: 'Server Error' })
		}
	},

	async fetchCreditCardById(req, res) {
		const { cardId } = req.params
		if (!cardId)
			return res
				.status(400)
				.send({ statusCode: 400, message: 'Card Id not found' })
		try {
			const user = req.user
			const profile = await Profile.findOne({ user: user._id })
			if (!profile)
				return res
					.status(404)
					.send({ statusCode: 404, message: 'Profile not found' })
			const cardIndex = profile.creditCards.findIndex(
				card => card._id.toString() === cardId
			)
			if (cardIndex === -1)
				return res
					.status(404)
					.send({ statusCode: 404, message: 'Card not found' })
			res.send({ statusCode: 200, card: profile.creditCards[cardIndex] })
		} catch (err) {
			if (err.name === 'CastError')
				return res
					.status(400)
          .send({ statusCode: 400, message: 'Invalid Card Id' })
      res.status(500).send({ statusCode: 500, message: 'Server Error' })
		}
	},

	async updateCreditCardById(req, res) {
		const { cardId } = req.params
		if (!cardId)
			return res
				.status(400)
				.send({ statusCode: 400, message: 'Card Id not found' })
		try {
			const errors = validationResult(req)
			if (!errors.isEmpty())
				return res
					.status(400)
					.send({ statusCode: 400, message: errors.array() })
			const user = req.user
			const profile = await Profile.findOne({ user: user._id })
			if (!profile)
				return res
					.status(404)
					.send({ statusCode: 404, message: 'Profile not found' })
			const cardIndex = profile.creditCards.findIndex(
				card => card._id.toString() === cardId
			)
			if (cardIndex === -1)
				return res
					.status(404)
					.send({ statusCode: 404, message: 'Card not found' })
			const { name, number, expMonth, expYear } = req.body
			let cardSystem = null
			switch (String(number)[0]) {
				case '3':
					cardSystem = 'American Express / Diners Club'
					break
				case '4':
					cardSystem = 'Visa'
					break
				case '5':
					cardSystem = 'MasterCard'
					break
				case '6':
					cardSystem = 'Discover'
					break
			}

			const creditCardObj = {
				_id: cardId,
				cardSystem,
				cardName: name,
				cardNumber: number,
				cardExpiryMonth: expMonth,
				cardExpiryYear: parseInt(expYear) - 2000
			}

			profile.creditCards[cardIndex] = creditCardObj
			await profile.save()
			res.send({ statusCode: 200, card: creditCardObj })
		} catch (err) {
			if (err.name === 'CastError')
				return res
					.status(400)
          .send({ statusCode: 400, message: 'Invalid Card Id' })
      res.status(500).send({ statusCode: 500, message: 'Server Error' })
		}
	},

	async deleteCreditCardById(req, res) {
		const { cardId } = req.params
		if (!cardId)
			return res
				.status(400)
				.send({ statusCode: 400, message: 'Card Id not found' })
		try {
			const user = req.user
			const profile = await Profile.findOne({ user: user._id })
			if (!profile)
				return res
					.status(404)
					.send({ statusCode: 404, message: 'Profile not found' })
			const cardIndex = profile.creditCards.findIndex(
				card => card._id.toString() === cardId
			)
			if (cardIndex === -1)
				return res
					.status(404)
					.send({ statusCode: 404, message: 'Card not found' })
			const card = profile.creditCards[cardIndex]
			profile.creditCards = profile.creditCards.filter(
				card => card._id.toString() !== cardId
			)
			await profile.save()
			return res.status(200).send({ statusCode: 200, card })
		} catch (err) {
			if (err.name === 'CastError')
				return res
					.status(400)
          .send({ statusCode: 400, message: 'Invalid Card Id' })
      res.status(500).send({ statusCode: 500, message: 'Server Error' })
		}
	},

	async fetchAddresses(req, res) {
		try {
			const errors = validationResult(req)
			if (!errors.isEmpty())
				return res
					.status(400)
					.send({ statusCode: 400, message: errors.array() })
			const profile = await Profile.findOne({ user: req.user._id })
			if (!profile) return res.send({ statusCode: 200, addresses: [] })
			res.send({ statusCode: 200, addresses: profile.addresses })
		} catch (err) {
			res.status(500).send({ statusCode: 500, message: 'Server Error' })
		}
	},

	async fetchAddressById(req, res) {
    const { addressId } = req.params
		if (!addressId)
			return res
				.status(400)
				.send({ statusCode: 400, message: 'Address Id not found' })
		try {
			const user = req.user
      const profile = await Profile.findOne({ user: user._id })
			if (!profile)
				return res
					.status(404)
          .send({ statusCode: 404, message: 'Profile not found' })
      const addressIndex = profile.addresses.findIndex(add => add._id.toString() === addressId)
      if (addressIndex === -1) return res.status(404).send({ statusCode: 404, message: 'Address Not found'})
      const address = profile.addresses[addressIndex]
      address.phNumber = String(address.phNumber).slice(1)
      res.send({ statusCode: 200, address })
		} catch (err) {
			if (err.name === 'CastError')
				return res
					.status(400)
          .send({ statusCode: 400, message: 'Invalid Address Id' })
      res.status(500).send({ statusCode: 500, message: 'Server Error' })
		}
	},

	async deleteAddressById(req, res) {
		const { addressId } = req.params
		if (!addressId)
			return res
				.status(400)
				.send({ statusCode: 400, message: 'Address Id not found' })
		try {
			const user = req.user
			const profile = await Profile.findOne({ user: user._id })
			if (!profile)
				return res
					.status(404)
          .send({ statusCode: 404, message: 'Profile not found' })
      const addressIndex = profile.addresses.findIndex(add => add._id.toString() === addressId)
      if (addressIndex === -1) return res.status(404).send({ statusCode: 404, message: 'Address Not found'})
      const address = profile.addresses[addressIndex]
      profile.addresses = profile.addresses.filter(add => add._id.toString() !== addressId)
      await profile.save()
      res.status(201).send({ statusCode: 201, address })
		} catch (err) {
			if (err.name === 'CastError')
				return res
					.status(400)
          .send({ statusCode: 400, message: 'Invalid Address Id' })
      res.status(500).send({ statusCode: 500, message: 'Server Error' })
		}
	},

	async updateAddressById(req, res) {
		const { addressId } = req.params
		if (!addressId)
			return res
				.status(400)
				.send({ statusCode: 400, message: 'Address Id not found' })
		try {
			const errors = validationResult(req)
			if (!errors.isEmpty())
				return res
					.status(400)
					.send({ statusCode: 400, message: errors.array() })
			const user = req.user
			const profile = await Profile.findOne({ user: user._id })
			if (!profile)
				return res
					.status(404)
          .send({ statusCode: 404, message: 'Profile not found' })
      const addressIndex = profile.addresses.findIndex(add => add._id.toString() === addressId)
      if (addressIndex === -1) return res.status(404).send({ statusCode: 404, message: 'Address Not found'})
			const {
				name,
				mode,
				addressLine1,
				addressLine2,
				city,
				state,
				postalCode,
				country,
				phNumber,
				faxNumber
      } = req.body

			const profileObj = {
        _id: addressId,
				name,
				mode,
				addressLine1,
				addressLine2,
				city,
				state,
				postalCode,
				country,
				phNumber: `+1${phNumber}`,
				faxNumber,
      } 
      profile.addresses[addressIndex] = { ...profile.addresses[addressIndex], ...profileObj }
      await profile.save()
      res.status(202).send({ statusCode: 202, address: profile.addresses[addressIndex] })
		} catch (err) {
			if (err.name === 'CastError')
				return res
					.status(400)
          .send({ statusCode: 400, message: 'Invalid Address Id' })
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
			if (err.name === 'CastError')
				return res
					.status(400)
					.send({ statusCode: 400, message: 'Invalid Address Id' })
			res.status(500).send({ statusCode: 500, message: 'Server Error' })
		}
	}
}
