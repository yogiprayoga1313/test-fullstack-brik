const errorHandler = require('../helpers/errorHendler.helper')
const {Category} = require('../models')

module.exports = {
    getAll: async (req, res) => {
        try {
            const data = await Category.findAll()
            res.json({
                success: true,
                message: 'Data Category',
                results: data
            })
        } catch (error) {
            return errorHandler(res, error)
        }
    }
}