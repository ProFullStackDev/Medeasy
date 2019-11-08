const { Schema, model } = require('mongoose')

const guestSchema = new Schema({
  name: { type: String, required: true },
  email: { type: String, required: true }
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