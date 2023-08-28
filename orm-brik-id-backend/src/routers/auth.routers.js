const authRouter = require('express').Router()
const authContorller = require('../controllers/auth.controller')

authRouter.post('/register', authContorller.register)
authRouter.post('/login', authContorller.login)

module.exports = authRouter