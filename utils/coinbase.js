const { Client } = require('coinbase-commerce-node')

const client = Client.init(process.env.COINBASE_KEY)

module.exports = client