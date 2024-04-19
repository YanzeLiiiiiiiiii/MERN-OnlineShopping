const express = require('express')
const orderController = require('../controllers/orderController')
const authHandler = require('../middleware/authMiddlerware')


const router = express.Router()

router.route('/').post(authHandler.protect, orderController.createOrders).get(authHandler.protect, authHandler.admin, orderController.getAllOrders)

router.post('/mine', authHandler.protect, orderController.getMyorder)

router.post('/:id', authHandler.protect, authHandler.admin, orderController.getOrderById)

router.route('/:id/pay').get(authHandler.protect, orderController.updataOrderPaid)

router.route('/:id/deliver').put(authHandler.protect, authHandler.admin, orderController.updataOrderDelivered)

module.exports = router 