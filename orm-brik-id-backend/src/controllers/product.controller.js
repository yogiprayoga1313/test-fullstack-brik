const fileRemover = require('../helpers/fileRemover.helper')
const {Product, Category} = require('../models')
const {Op} = require('sequelize')
const errorHandler = require('../helpers/errorHendler.helper')


module.exports = {
    getAll: async (req, res) => {
        try {
            const search = req.query.search || ''
            const sort = req.query.sort || 'ASC'
            const sortBy = req.query.sortBy || 'id'
            const page = req.query.page ? parseInt(req.query.page) : 1
            const limit = req.query.limit ? parseInt(req.query.limit) : 6
            const offset = page === 1 ? 0 : (page - 1) * limit

            const totalData = await Product.count({
                where: {
                    name:{[Op.iLike]: `%${search}%`},
                },
                order: [[sortBy, sort]],
                limit: limit,
                offset: offset
            })
            const totalPage = Math.ceil(totalData / limit)
            const data = await Product.findAll({
                where: {
                    name:{[Op.iLike]: `%${search}%`},
                },
                order: [[sortBy, sort]],
                limit: limit,
                offset: offset,
                include: {
                    model: Category,
                    attributes: ['name']
                }
            })
            res.json(
                {
                    success: true,
                    messsage: 'Data All Product',
                    totalData: totalData,
                    totalPage: totalPage,
                    results: data
                }
            )
        } catch (error) {
            return errorHandler(res, error)
        }
    },
    getOne: async (req, res) => {
        try {
            const id = parseInt(req.params.id)
            const data = await Product.findOne({
                where: {
                    id
                },
                include: {
                    model: Category,
                    attributes: ['name']
                }
            })
            res.json({
                success: true,
                message: 'Detail Product',
                results: data
            })
        } catch (error) {
            return errorHandler(res, error)
        }
    },
    createProduct: async (req, res) => {
        try {
            const {id} = req.user
            if(!id){
                throw Error('unauthorized')
            }
            const categoryId = req.body.categoryId
            const checkCategory = await Category.findOne({
                where: {
                    id: categoryId
                }
            })
            if(!checkCategory){
                fileRemover(req.file)
                throw Error('category_not_found')
            }

            if(req.file){
                req.body.image = req.file.path
            }

            const data = await Product.create(req.body)
            res.json({
                success: true,
                message: 'Product Create Success',
                results: data
            })
        } catch (error) {
            fileRemover(req.file)
            return errorHandler(res, error)
        }
    }
}