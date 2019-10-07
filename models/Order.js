const { Schema, model } = require('mongoose')

const ordersSchema = new Schema({
  
})

const Order = model('order', ordersSchema)
module.exports = Order