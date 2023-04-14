const Order = require('../models/order.model');
const Product = require('../models/product.model');
const Address = require('../models/address.model');
const constants = require('../utils/constants')
const User = require('../models/user.model');


async function placeOrder(req, res) {

    try {

        const { productId, addressId, quantity } = req.body;


        const accessToken = req.headers['x-access-token'];

        // Check if the access token is provided
        if (!accessToken) {
            return res.status(401).send({
                message: 'Please Login first to access this endpoint!'
            });
        }


        const loggedUser = await User.findOne({
            email: req.email
        })

        if (loggedUser.role != constants.userType.user) {

            return res.status(401).send({
                message: 'You are not authorised to access this endpoint!'
            })

        }

        // Check if product exists
        const product = await Product.findOne({ productId: productId });

        if (!product) {
            return res.status(404).json(
                { message: `No Product found for ID - ${productId}!` }
            );
        }

        // Check product availability
        if (product.availableItems < quantity) {
            return res.status(400).json({
                message: `Product with ID - ${productId} is currently out of stock!`,
            });
        }

        // Check if address exists
        const address = await Address.findOne({ _id: addressId });
        if (!address) {
            return res.status(404).json({
                message: `No Address found for ID - ${addressId}!`
            });
        }

        const orderObj = {
            userId: loggedUser,
            productId: product,
            shippingAddressId: address,
            amount: product.price * quantity,
            quantity: quantity
        }


        const newOrder = await Order.create(orderObj);

        product.availableItems -= quantity;

        await product.save();

        const responseObj = await Order.findById({
            _id: newOrder.id,
        })
            .populate(["productId", "shippingAddressId", "userId"])
            .exec();

        return res.status(200).send(responseObj);



    } catch (err) {

        console.log("Some error while placing the order", err.message);
        res.status(500).send({
            message: "Some internal error while placing the order",
        });

    }
}

module.exports = {
    placeOrder: placeOrder,
}
