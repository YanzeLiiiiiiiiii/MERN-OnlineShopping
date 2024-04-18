const jwt = require('jsonwebtoken')

const generateToken = (res, id) => {

    const sercreyKey = 'Ryan_Onlineshopping'

    const token = jwt.sign({ userId: id }, sercreyKey, { expiresIn: '10d' })

    res.cookie('jwt', token, { httpOnly: true, sameSite: 'strict', maxAge: 60 * 60 * 1000, })
}

module.exports = { generateToken }

