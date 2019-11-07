const Category = require('../models/Category')
const { validationResult } = require('express-validator')

module.exports = {
  
  fetchAllCategories: async (req, res) => {
    try {
      const categories = await Category.find({}, 'name')
      if (!categories) return res.status(404).send({ statusCode: 404, message: 'No categories present' })
      res.send({ statusCode: 200, categories })
    } catch (err) {
      console.error(err.message)
      res.status(500).send({ statusCode: 500, message: 'Server Error' })
    }
  },

  createCategory: async (req, res) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) return res.status(400).send({ statusCode: 400, message: errors.array() })
    try {
      let category = await Category.findOne({ name: req.body.name })
      if (category) return res.status(400).send({ statusCode: 400, message: 'Category already exists' })
      else category = await Category.create(req.body) 
      res.status(201).send({ statusCode: 201, category })
    } catch (err) {
      console.error(err.message)
      res.status(500).send({ statusCode: 500, message: 'Server Error' })
    }
  },

  fetchCategoryById: async (req, res) => {
    const { categoryId } = req.params
    try {
      if (!categoryId) return res.status(400).send({ statusCode: 400, message: 'Category Id not found' })
      const category = await Category.findById(categoryId)
      if (!category) return res.status(404).send({ statusCode: 404, message: 'Category not found' })
      res.send({ statusCode: 200, category })
    } catch (err) {
      if (err.name === 'CastError') return res.status(400).send({ statusCode: 400, message: 'Invalid Category Id' })
      console.error(err.message)
      res.status(500).send({ statusCode: 500, message: 'Server Error' })
    }
  },

  updateCategoryById: async (req, res) => {
    const { categoryId } = req.params
    try {
      if (!categoryId) return res.status(400).send({ statusCode: 400, message: 'Category Id not found' })
      const category = await Category.findByIdAndUpdate(categoryId, { $set: req.body }, { new: true })
      if (!category) return res.status(404).send({ statusCode: 404, message: 'Category not found' })
      res.send({ statusCode: 200, category })
    } catch (err) {
      if (err.name === 'CastError') return res.status(400).send({ statusCode: 400, message: 'Invalid Category Id' })
      console.error(err.message)
      res.status(500).send({ statusCode: 500, message: 'Server Error' })
    }
  },
  
  deleteCategoryById: async (req, res) => {
    const { categoryId } = req.params
    try {
      if (!categoryId) return res.status(400).send({ statusCode: 400, message: 'Category Id not found' })
      const category = await Category.findByIdAndDelete(categoryId)
      if (!category) return res.status(404).send({ statusCode: 404, message: 'Category not found' })
      res.send({ statusCode: 200, category })
    } catch (err) {
      if (err.name === 'CastError') return res.status(400).send({ statusCode: 400, message: 'Invalid Category Id' })
      console.error(err.message)
      res.status(500).send({ statusCode: 500, message: 'Server Error' })
    }
  }

}