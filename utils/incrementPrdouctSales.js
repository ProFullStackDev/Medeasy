const Product = require('../models/Product')

module.exports = async (...productIds) => {
	return Promise.all(
		productIds.map(
			productId =>
				new Promise((resolve, reject) => {
					Product.findById(productId)
						.then(product => {
							product.timesSold += 1
							return product.save()
						})
						.then(product => resolve(product))
						.catch(err => {
							console.log(err)
							reject(err)
						})
				})
		)
	).catch(err => console.log(err))
}
