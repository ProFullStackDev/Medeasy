const { Schema, model } = require('mongoose')

const profileSchema = new Schema({
  user: { type: Schema.Types.ObjectId, ref: 'user' },
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  middleName: String,
  addresses: {
    type: [{
      mode: { type: String, required: true },
      addressLine1: { type: String, required: true },
      addressLine2: String,
      city: { type: String, required: true },
      state: { type: String, required: true },
      postalCode: { type: Number, required: true },
      country: { type: String, default: 'United States of America' },
      phNumber: { type: Number, required: true },
      faxNumber: Number
    }],
    required: true
  }
}, { timestamps: true })

profileSchema.methods = {
  toJSON: function () {
    const profile = this.toObject()
    delete profile.__v
    return profile
  }
}

const Profile = model('profile', profileSchema)
module.exports = Profile

