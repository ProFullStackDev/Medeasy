const express = require('express')
const dotenv = require('dotenv')
const morgan = require('morgan')

dotenv.config({ path: './.env' })
require('./db')

const app = express()
const port = process.env.PORT || 9998

// Middlewares
if (process.env.NODE_ENVIRONMENT === 'development') app.use(morgan('dev'))
app.use(express.json())

// All routes
app.use('/api/user', require('./routes/userRouter'))
app.use('/api/profile', require('./routes/profileRoutes'))
app.use('/api/cart', require('./routes/cartRoutes'))
app.use('/api/products', require('./routes/productRoutes'))
app.use('/api/categories', require('./routes/categoryRoutes'))

app.post('/', (req, res) => {
  res.send(req.body)
})

app.listen(port, () => console.log('Server listening on port', port))

