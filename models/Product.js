const { Schema, model } = require('mongoose')
const Review = require('./Review')

const productSchema = new Schema(
	{
		name: { type: String, trim: true, required: true },
		description: { type: String, trim: true, required: true },
		sideEffects: { type: [String], required: true },
		price: { type: Object, required: true },
		category: { type: Schema.Types.ObjectId, ref: 'category' },
		admin: { type: Schema.Types.ObjectId, ref: 'user' },
		stockAvailable: { type: Boolean, default: true },
		timesSold: { type: Number, default: 0 },
		dosages: { type: [String], required: true },
		quantities: { type: [String], required: true },
		photos: { type: [String], required: true }
	},
	{ timestamps: true }
)

productSchema.methods = {
	toJSON: function() {
		const product = this.toObject()
		delete product.__v
		return product
	}
}

productSchema.index({ name: 'text' })
productSchema.pre('remove', async function (next) {
	await Review.deleteMany({ product: this._id })
	next()
})

const Product = model('product', productSchema)
module.exports = Product
