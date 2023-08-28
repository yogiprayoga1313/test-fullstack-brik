const categoryRouter = require('express').Router()
const categoryController = require('../controllers/category.controller')

categoryRouter.get('/', categoryController.getAll)

module.exports = categoryRouter