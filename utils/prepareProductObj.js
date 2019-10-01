module.exports = reqBodyObj => {
  // Preparing the product object
  const { name, description, price, quantities, dosages, stockAvailable } = reqBodyObj
  const prices = price.split(',')
  const productObj = { name, description, price: null, quantities: [], dosages: [], stockAvailable }
  productObj.dosages = dosages.includes(',') ? dosages.split(',') : dosages
  productObj.quantities = quantities.includes(',') ? quantities.split(',') : quantities

  productObj.price = productObj.dosages.reduce((priceObj, dosage, index) => {
    priceObj[`${dosage}mg`] = productObj.quantities.reduce((quantityObj, quantity, index1) => {
      quantityObj[quantity] = prices[(index * productObj.quantities.length) + index1]
      return quantityObj
    }, {})
    return priceObj
  }, {})

  return productObj
}