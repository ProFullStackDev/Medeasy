const { Schema, model } = require('mongoose')

const profileSchema = new Schema(
	{
		user: { type: Schema.Types.ObjectId, ref: 'user' },
		addresses: [
			{
				name: { type: String, required: true },
				mode: { type: String, required: true },
				addressLine1: { type: String, required: true },
				addressLine2: String,
				city: { type: String, required: true },
				state: { type: String, required: true },
				postalCode: { type: Number, required: true },
				country: { type: String, default: 'United States of America' },
				phNumber: { type: Number, required: true },
				faxNumber: Number
			}
		],
		creditCards: [
			{
				cardSystem: { type: String, required: true },
				cardName: { type: String, required: true },
        cardNumber: { type: Number, required: true },
        cardExpiryMonth: { type: Number, required: true },
        cardExpiryYear: { type: Number, required: true }
			}
		],
		paypalId: String,
		bitcoinAddress: String
	},
	{ timestamps: true }
)

profileSchema.methods = {
	toJSON: function() {
		const profile = this.toObject()
		delete profile.__v
		return profile
	}
}

const Profile = model('profile', profileSchema)
module.exports = Profile
