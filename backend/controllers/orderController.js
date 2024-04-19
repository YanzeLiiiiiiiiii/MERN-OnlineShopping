const Order = require('../models/orderModule')
const asyncHandler = require('../middleware/asyncHandler');



// @desc create order
// @route POST /orders
const createOrders = asyncHandler(async (req, res) => {

    const {
        orderItems,
        shippingAddress,
        paymentMethod,
        itemsPrice,
        taxPrice,
        shippingPrice,
        totalPrice,
    } = req.body;

    if (orderItems && orderItems.length === 0) {
        res.status(400);
        throw new Error('No order items');
    } else {
        const order = new Order({
            orderItems: orderItems.map(item => ({
                ...item,
                product: item._id,
                _id: undefined,
            })),
            user: req.user._id,
            shippingAddress,
            paymentMethod,
            itemsPrice,
            taxPrice,
            shippingPrice,
            totalPrice,
        });

        const createdOrder = await order.save();

        res.status(201).json(createdOrder);
    }
});



// @desc Get user orders
// @route GET /orders/myorders
const getMyorder = asyncHandler(async (req, res) => {
    const order = await Order.find({ user: req.user_id })
    res.status(200).json(order)
})


// @desc Get order by id
// @route GET /orders/：id
const getOrderById = asyncHandler(async (req, res) => {
    const order = await Order.findById(req.params.id).populate('user', 'name email')

    if (order) {
        res.status(404)
    } else {
        res.status(200)
        throw new Error('Order not found')
    }
})



// @desc Confirm paid
// @route GET /orders/：id/pay
const updataOrderPaid = asyncHandler(async (req, res) => {
    res.send('updataOrderPaid')
})


// @desc Confirm delivered
// @route GET /orders/：id/deliver
const updataOrderDelivered = asyncHandler(async (req, res) => {
    res.send('updataOrderDelivered')
})


// @desc Get all orders
// @route GET /orders
// @access admin
const getAllOrders = asyncHandler(async (req, res) => {
    res.send('getAllOrders')
})


module.exports = {
    createOrders,
    getMyorder,
    getOrderById,
    updataOrderDelivered,
    updataOrderPaid,
    getAllOrders
}