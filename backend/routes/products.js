const express = require('express')
const router = express.Router()
const productController = require('../controllers/productController')
const authHandler = require('../middleware/authMiddlerware')


router.route('/').get(productController.getAll).post(authHandler.protect, authHandler.admin, productController.createProduct)

router.route('/:id').get(productController.getById).put(authHandler.protect, authHandler.admin, productController.updateProduct).delete(authHandler.protect, authHandler.admin, productController.deleteProduct)

router.route('/:id/reviews').post(authHandler.protect, productController.createProductReview)


module.exports = router 