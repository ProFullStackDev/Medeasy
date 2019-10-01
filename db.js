const mongoose = require('mongoose')

mongoose.connect(process.env.MONGODB_URI.replace('<password>', process.env.MONGODB_PASSWORD), {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
  useUnifiedTopology: true
}, conn => {
  console.log('Database connected successfully')
})

