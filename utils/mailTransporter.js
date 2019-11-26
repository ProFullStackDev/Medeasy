const nodeMailer = require('nodemailer')

const createTransporter = email => {
  const transporter = nodeMailer.createTransport({
    host: process.env.EMAIL_HOST,
    port: 465,
    secure: true,
    auth: {
      user: email,
      pass: process.env.EMAIL_PASSWORD
    }
  })
  return transporter
}

module.exports = createTransporter