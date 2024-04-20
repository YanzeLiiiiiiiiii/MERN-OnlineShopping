const Product = require('../models/productModel')
const asyncHandler = require('../middleware/asyncHandler')

// @desc get all products
// @route GET /products
const getAll = asyncHandler(async (req, res) => {
    const products = await Product.find({})
    res.json(products)
})

// @desc get  product by id
// @route GET /products/:id
const getById = asyncHandler(async (req, res) => {
    const products = await Product.findById(req.params.id)
    if (products) {
        return res.json(products)
    } else {
        res.status(400)
        throw new Error('Resuorces not found')
    }

})

module.exports = { getAll, getById }