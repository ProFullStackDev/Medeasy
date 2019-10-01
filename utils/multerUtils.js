const multer = require('multer')
const fs = require('fs')

module.exports = {
  storage: multer.diskStorage({
    destination: (req, file, cb) => {
      if (!req.files) cb(new Error(), null)
      if (!req.body.name) cb(new Error('Name is required'), null)
      else {
        const pathName = `uploads/${req.body.name}`
        const pathExists = fs.existsSync(pathName)
        if (!pathExists) fs.mkdirSync(pathName, { recursive: true })
        cb(null, pathName)
      }
    },
    filename: (req, file, cb) => {
      cb(null, file.originalname)
    }
  }),

  fileFilter: (req, file, cb) => {
    if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
      const pathName = `uploads/${req.body.name}/${file.originalname}`
      const pathExists = fs.existsSync(pathName)
      if (pathExists) {
        file.path = pathName
        req.files.push(file)
        cb(null, false)
      }
      else cb(null, true)
    }
    else cb(new Error('File format not supported'), false)
  },

  limits: {
    fileSize: 1024 * 1024 * 2
  }
}