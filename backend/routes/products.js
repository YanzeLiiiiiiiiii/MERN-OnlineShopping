const express = require('express')
const router = express.Router()
const Product = require('../models/productModel')
const asyncHandler = require('../middleware/asyncHandler')

router.get('/', asyncHandler(async (req, res) => {
    const products = await Product.find({})
    console.log(products)
    res.json(products)

}))

router.get('/:id', asyncHandler(async (req, res) => {

    const products = await Product.findById(req.params.id)
    if (products) {
        res.json(products)
    }
    res.status(404).json({ message: 'NOT FOUND' })

}))

module.exports = router