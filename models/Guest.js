const { Schema, model } = require('mongoose')

const guestSchema = new Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  company: String,
  baddressLine1: { type: String, required: true },
  baddressLine2: String,
  bcity: { type: String, required: true },
  bstate: { type: String, required: true },
  bpostalCode: { type: Number, default: true },
  bcountry: { type: String, default: 'United States of America' },
  bphNumber: { type: Number, required: true },
  bfaxNumber: Number,
  saddressLine1: { type: String, required: true },
  saddressLine2: String,
  scity: { type: String, required: true },
  sstate: { type: String, required: true },
  spostalCode: { type: Number, default: true },
  scountry: { type: String, default: 'United States of America' },
  sphNumber: { type: Number, required: true },
  sfaxNumber: Number
}, { timestamps: true })

guestSchema.methods = {
  toJSON: function () {
    const guest = this
    delete guest.__v
    delete guest.updatedAt
    return guest
  }
}

const Guest = model('guest', guestSchema)
module.exports = Guest