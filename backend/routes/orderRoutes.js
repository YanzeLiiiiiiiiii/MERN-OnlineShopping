const express = require('express')
const orderController = require('../controllers/orderController')
const authHandler = require('../middleware/authMiddlerware')


const router = express.Router()

router.route('/').post(authHandler.protect, orderController.createOrders).get(authHandler.protect, authHandler.admin, orderController.getAllOrders)

router.route('/mine').get(authHandler.protect, orderController.getMyorder)

router.route('/:id').get(authHandler.protect, orderController.getOrderById);

router.route('/:id/pay').put(authHandler.protect, orderController.updataOrderPaid)

router.route('/:id/deliver').put(authHandler.protect, authHandler.admin, orderController.updataOrderDelivered)

module.exports = router 