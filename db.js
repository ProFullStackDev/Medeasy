const mongoose = require('mongoose')
console.log(process.env)
mongoose.connect(process.env.MONGODB_URI.replace('<password>', process.env.MONGODB_PASSWORD), conn => console.log('Database connected successfully'))

