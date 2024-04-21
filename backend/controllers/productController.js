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

// @desc create product
// @route POST /products
const createProduct = asyncHandler(async (req, res) => {

    const product = new Product({
        name: 'Sample name',
        price: 0,
        user: req.user._id,
        image: '/images/sample.jpg',
        brand: 'Sample brand',
        category: 'Sample category',
        countInStock: 0,
        numReviews: 0,
        description: 'Sample description',
    })

    const newProduct = product.save()
    res.status(201).json(newProduct)

})


// @desc update products
// @route PUT /products/:id
const updateProduct = asyncHandler(async (req, res) => {
    const { name, price, description, image, brand, category, countInStock } =
        req.body

    const product = await Product.findById(req.params.id)

    if (product) {
        product.name = name
        product.price = price
        product.description = description
        product.image = image
        product.brand = brand
        product.category = category
        product.countInStock = countInStock

        const updatedProduct = await product.save()
        res.json(updatedProduct)
    } else {
        res.status(404)
        throw new Error('Product not found')
    }

})

// @desc delete products
// @route DELETE /products/:id
const deleteProduct = asyncHandler(async (req, res) => {

    const product = await Product.findById(req.params.id)
    if (product) {
        await Product.deleteOne({ _id: product._id });
        res.json({ message: 'Product removed' });
    } else {
        res.status(404);
        throw new Error('Product not found');
    }
})


module.exports = { getAll, getById, createProduct, updateProduct, deleteProduct }