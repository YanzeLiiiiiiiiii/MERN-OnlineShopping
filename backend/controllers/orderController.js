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

    const order = await Order.find({ user: req.user._id })
    res.status(200).json(order)
})


// @desc Get order by id
// @route GET /orders/：id
const getOrderById = asyncHandler(async (req, res) => {
    const order = await Order.findById(req.params.id).populate(
        'user',
        'name email'
    )

    if (order) {
        res.json(order);
    } else {
        res.status(404);
        throw new Error('Order not found');
    }
});


// @desc Confirm paid
// @route PUT /orders/：id/pay
const updataOrderPaid = asyncHandler(async (req, res) => {
    const order = await Order.findById(req.params.id);
    if (order) {
        order.isPaid = true;
        order.paidAt = Date.now();
        order.paymentResult = {
            id: req.body.id,
            status: req.body.status,
            update_time: req.body.update_time,
            email_address: req.body.payer.email_address,
        };

        const updatedOrder = await order.save();

        res.json(updatedOrder);
    } else {
        res.status(404);
        throw new Error('Order not found');
    }

})


// @desc Confirm delivered
// @route PUT /orders/：id/deliver
const updataOrderDelivered = asyncHandler(async (req, res) => {
    const order = await Order.findById(req.params.id)
    if (order) {
        order.isDelivered = true
        order.deliveredAt = Date.now()
        const updateOrder = order.save()
        res.status(200).json(updateOrder)
    } else {

        res.status(404);
        throw new Error('Order not found');
    }

})


// @desc Get all orders
// @route GET /orders
// @access admin
const getAllOrders = asyncHandler(async (req, res) => {
    const order = await Order.find({}).populate('user', 'id  name')
    res.status(200).json(order)
})


module.exports = {
    createOrders,
    getMyorder,
    getOrderById,
    updataOrderDelivered,
    updataOrderPaid,
    getAllOrders
}