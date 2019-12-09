const { model, Schema } = require('mongoose')

const affliateSchema = new Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true },
    companyName: String,
    city: { type: String, required: true },
    comment: { type: String, required: true },
    street: { type: String, required: true },
    state: { type: String, required: true },
    country: { type: String, required: true },
    postalCode: { type: Number, required: true }
  },
  { timestamps: true }
)

affliateSchema.methods.toJSON = function () {
  const affliate = this.toObject()
  delete affliate.__v
  return affliate
}

const Affliate = model('affliate', affliateSchema)
module.exports = Affliate
