const router = require('express').Router()

router.get('/', (req, res) => {
    return res.json({
        success: true,
        message: 'Backend OK!'
    })
})


router.use('/product', require('./product.routers'))
router.use('/category', require('./category.routers'))
router.use('/auth', require('./auth.routers'))

router.use('*', (request, response)=>{
    return response.status(404).json({
        success:false,
        message:'Resource not found'
    })
})

module.exports = router