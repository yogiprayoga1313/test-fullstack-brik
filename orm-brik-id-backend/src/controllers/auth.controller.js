const {User} = require('../models')
const argon = require('argon2')
const jwt = require('jsonwebtoken')
const errorHandler = require('../helpers/errorHendler.helper')
const {APP_SECRET} = process.env
module.exports = {
    register: async (req, res) => {
        try {
            const {fullName, email} = req.body

            const checkDuplicate = await User.findOne({
                where: {
                    email
                }
            })

            if(checkDuplicate){
                throw Error('duplicate_email')
            }

            const password = await argon.hash(req.body.password)
            const userData = {
                fullName,
                email,
                password
            }
            const data = await User.create(userData)
            const results = {
                id: data.id,
                email: data.email,
                fullName: data.fullName,
            }
            res.json({
                success: true,
                message: 'User Created',
                results
            })
        } catch (error) {
            return errorHandler(res, error)
        }
    },
    login: async (req, res) => {
        try {
            const {email, password} = req.body
            const findUser = await User.findOne({
                where: {
                    email
                }
            })
            if(!findUser){
                throw Error('wrong_credentials')
            }

            const verify = await argon.verify(findUser.password, password)
            if(!verify){
                throw Error('wrong_credentials')
            }

            const token = jwt.sign({
                id:findUser.id
            }, APP_SECRET)

            return res.json({
                success: true,
                message: 'Login Successfuly',
                results: {token}
            })
        } catch (error) {
            return errorHandler(res, error)
        }
    }
}