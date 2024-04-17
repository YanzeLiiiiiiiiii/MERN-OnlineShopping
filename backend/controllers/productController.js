const Product = require('../models/productModel')
const asyncHandler = require('../middleware/asyncHandler')


const getAll = asyncHandler(async (req, res) => {
    const products = await Product.find({})
    console.log(products)
    res.json(products)
})


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