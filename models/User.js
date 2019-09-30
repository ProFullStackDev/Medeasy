const { Schema, model } = require('mongoose')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

const userSchema = new Schema({
  email: { type: String, required: true },
  password: { type: String, required: true },
  isAdmin: { type: Boolean, default: false },
  accessToken: String
}, { timestamps: true })


// Model methods (Entire class methods)
userSchema.statics = {
  authenticateUser: async (email, password) => {
    // Checking whether user's email exists
    const user = await User.findOne({ email })
    if (!user) throw new Error('Incorrect credentials')
    // Verifying passwords are same
    const isMatched = await bcrypt.compare(password, user.password)
    if (!isMatched) throw new Error('Incorrect Credentials') 
    // If the passwords are matched means return the user
    return user
  }
}

userSchema.methods = {
  toJSON: function () {
    const user = this.toObject()
    delete user.password
    delete user.accessToken
    delete user.__v
    return user
  },
  generateToken: async function () {
    const accessToken = await jwt.sign({ id: this._id.toString() }, process.env.JWT_SECRET_KEY, { expiresIn: '12h' })
    this.accessToken = accessToken
    await this.save()
    return accessToken
  }
}

userSchema.pre('save', async function (next) {
  if (this.isModified('password')) {
    const hashedPassword = await bcrypt.hash(this.password, 10)
    this.password = hashedPassword
  }
  next()
})

const User = model('user', userSchema)
module.exports = User