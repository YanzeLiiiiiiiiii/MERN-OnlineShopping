const jwt = require('jsonwebtoken')
const asyncHandler = require('./asyncHandler')
const User = require('../models/userModel')


//validate token and get user 
const protect = asyncHandler(async (req, res, next) => {
    let token
    token = req.cookies.jwt

    if (token) {
        try {
            const decode = jwt.verify(token, 'Ryan_Onlineshopping')
            req.user = await User.findById(decode.userId).select('-password')
            next()

        } catch (error) {
            console.log(error)
            res.status(401)
            throw new Error('Authrized Failed')
        }
    } else {
        res.status(401)
        throw new Error('Authrized Failed')
    }
})


//admin

const admin = (req, res, next) => {
    if (req.user && req.user.isAdmin) {
        next()
    } else {
        res.status(401)
        throw new Error('Authrized Failed')
    }
}


module.exports = {
    protect, admin
}