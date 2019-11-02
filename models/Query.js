const { Schema, model } = require('mongoose')

const querySchema = new Schema({
  name: { type: String, required: true },
  phoneNumber: { type: String, required: true },
  message: { type: String, required: true }
}, { timestamps: true })

querySchema.methods.toJSON = function () {
  const query = this.toObject()
  delete query.__v
  return query
}

const Query = model('query', querySchema)
module.exports = Query