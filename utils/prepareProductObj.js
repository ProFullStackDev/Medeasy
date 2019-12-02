module.exports = reqBodyObj => {
  // Preparing the product object
  const {
    name,
    description,
    price,
    quantities,
    dosages,
    sideEffects,
    stockAvailable,
    distributor
  } = reqBodyObj
  const prices = price.includes(',') ? price.split(',') : [price]
  const productObj = {
    name,
    description,
    price: null,
    quantities: [],
    dosages: [],
    sideEffects: [],
    stockAvailable,
    distributor
  }
  productObj.dosages = dosages.includes(',')
    ? dosages.split(',').map(dosage => dosage.trim())
    : [dosages]
  productObj.quantities = quantities.includes(',')
    ? quantities.split(',').map(quantity => quantity.trim())
    : [quantities]
  productObj.sideEffects = sideEffects.includes(',')
    ? sideEffects.split(',').map(sideEffect => sideEffect.trim())
    : [sideEffects]

  if (
    prices.length ===
    productObj.dosages.length * productObj.quantities.length
  ) {
    productObj.price = productObj.dosages.reduce((priceObj, dosage, index) => {
      priceObj[`${dosage.toString().trim()}mg`] = productObj.quantities.reduce(
        (quantityObj, quantity, index1) => {
          quantityObj[quantity] =
            prices[index * productObj.quantities.length + index1]
          return quantityObj
        },
        {}
      )
      return priceObj
    }, {})

    return productObj
  } else return null
}
