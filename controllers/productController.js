const rimraf = require('rimraf')
const path = require('path')
const fs = require('fs-extra')
const { validationResult } = require('express-validator')
const Product = require('../models/Product')
const prepareProductObject = require('../utils/prepareProductObj')

module.exports = {

  // Create a new product
  createProduct: async (req, res) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) return res.status(400).send({ statusCode: 400, message: errors.array() })
    if (req.files.length < 3) return res.status(400).send({ statusCode: 400, message: 'Minimum 3 images required' })
    const { categoryId } = req.params
    if (!categoryId) return res.status(400).send({ statusCode: 400, message: 'Invalid Category Id' })
    try {
      const filePaths = req.files.map(file => `/${file.path.replace(/\\/g, '/')}`)
      console.log(filePaths)
      if (await Product.findOne({ name: req.body.name }))
        return res.status(400).send({ statusCode: 400, message: 'Product already exists' })

      const productObj = prepareProductObject(req.body)
      if (!productObj) return res.status(400).send({ statusCode: 400, message: 'Bad request on Price upload' })

      let product = new Product(productObj)
      product.admin = req.user._id
      product.category = categoryId
      product.photos = filePaths
      await product.save()
      product = await product.populate('admin', ['name']).populate('category', ['name']).execPopulate()
      res.status(201).send({ statusCode: 201, product })
    } catch (err) {
      console.log(err.message, err)
      if (err.name === 'CastError') return res.status(400).send({ statusCode: 400, message: 'Invalid Product Id' })
      res.status(500).send({ statusCode: 500, message: 'Server Error'})
    }
  },

  // Fetch All products
  fetchAllProducts: async (req, res) => {
    const searchQuery = req.query.search || ''
    try {
      const products = await Product.find({ name: {$regex: '^' + searchQuery , $options: 'i'}}).select('-admin').populate('category', ['name']).sort('-createdAt')
      res.send({ statusCode: 200, count: products.length, products })
    } catch (err) {
      console.log(err.message)
      res.status(500).send({ statusCode: 500, message: 'Server Error' })
    }
  },

  // Fetch 5 top sold products
  async fetchTopFiveProducts (req, res) {
    try {
      const products = await Product.find({}).sort('-timesSold').limit(5)
      res.send({ statusCode: 202, products })
    } catch (err) {
      console.log(err.message)
      res.status(500).send({ statusCode: 500, message: 'Server Error' })
    }
  },

  // Fetch all products by a certain category
  fetchAllProductsByCategory: async (req, res) => {
    const { categoryId } = req.params
    if (!categoryId) return res.status(400).send({ statusCode: 400, message: 'Category Id not found' })
    try {
      const products = await Product.find({ category: categoryId }).populate('category', ['name'])
      if (!products) return res.status(404).send({ statusCode: 404, message: 'No products found' })
      res.send({ statusCode: 200, products })
    } catch (err) {
      console.error(err.message)
      if (err.name === 'CastError') return res.status(400).send({ statusCode: 400, message: 'Invalid Category Id' })
      res.status(500).send({ statusCode: 500, message: 'Server Error' })
    }
  },

  // Fetch a particular product by ID
  fetchProductById: async (req, res) => {
    const { productId } = req.params
    if (!productId) return res.status(400).send({ statusCode: 400, message: 'Product Id not found' })
    try {
      const product = await Product.findById(productId).populate('category', ['name'])
      if (!product) return res.status(404).send({ statusCode: 404, message: 'Product not found' })
      res.send({ statusCode: 200, product })
    } catch (err) {
      console.error(err.message)
      if (err.name === 'CastError') return res.status(400).send({ statusCode: 400, message: 'Invalid Product Id' })
      res.status(500).send({ statusCode: 500, message: 'Server Error' })
    }
  },

  // Update a product by ID
  updateProductById: async (req, res) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) return res.status(400).send({ statusCode: 400, message: errors.array() })
    const { productId } = req.params
    if (!productId) return res.status(400).send({ statusCode: 400, message: 'Product Id not found' })
    try {

      const filePaths = req.files.map(file => `/${file.path.replace(/\\/g, '/')}`)
      const originalFileNames = req.files.map(file => file.originalname)

      console.log(originalFileNames)

      let oldProduct = await Product.findOne({ admin: req.user._id, _id: productId })
      let product = await Product.findOneAndUpdate({ admin: req.user._id, _id: productId }, { $set: prepareProductObject(req.body) }, { new: true })

      if (oldProduct.name !== product.name) {
        const pathName1 = path.join(__dirname, `../uploads/${oldProduct.name}`)
        await fs.remove(pathName1)
      }
      
      const pathName2 = path.join(__dirname, `../uploads/${product.name}`)
      
      fs.readdir(pathName2, (err, files) => {
        files.forEach(file => {
          if (!originalFileNames.includes(file)) {
            fs.unlink(path.join(__dirname, `../uploads/${product.name}/${file}`), () => {})
          }
        })
      })

      if (!product) return res.status(404).send({ statusCode: 404, message: 'Product not found' })
      product.photos = filePaths
      await product.save()
      product = await product.populate('user', ['name']).populate('category', ['name']).execPopulate()
      res.status(202).send({ statusCode: 202, product })
    } catch (err) {
      console.log(err)
      if (err.name === 'CastError') return res.status(400).send({ statusCode: 400, message: 'Invalid Product Id' })
      res.status(500).send({ statusCode: 500, message: 'Server Error' })
    }
  },

  // Update a product's availability
  updateProductAvailability: async (req, res) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) return res.status(400).send({ statusCode: 400, message: errors.array()})
    const { productId } = req.params
    if (!productId) return res.status(400).send({ statusCode: 400, message: 'Product Id not found' })
    try {
      const { status } = req.body
      const product = await Product.findById(productId).populate('user', ['name']).populate('category', ['name'])
      product.stockAvailable = status
      await product.save()
      res.status(202).send({ statusCode: 202, product })
    } catch (err) {
      console.log(err.message)
      if (err.name === 'CastError') return res.status(400).send({ statusCode: 400, message: 'Invalid Product Id' })
      res.status(500).send({ statusCode: 500, message: 'Server Error' })
    }
  },

  // Delete a product by ID
  deleteProductById: async (req, res) => {
    const { productId } = req.params
    if (!productId) return res.status(400).send({ statusCode: 400, message: 'Product Id not found' })
    try {
      const product = await Product.findByIdAndDelete(productId).populate('user', ['name']).populate('category', ['name'])
      if (!product) return res.status(404).send({ statusCode: 404, message: 'Product not found' })
      rimraf(path.join(__dirname, `../uploads/${product.name}`), () => {
        res.send({ statusCode: 200, product })
      })
    } catch (err) {
      console.log(err.message)
      if (err.name === 'CastError') return res.status(400).send({ statusCode: 400, message: 'Invalid Product Id' })
      res.status(500).send({ statusCode: 500, message: 'Server Error' })
    }
  }
}