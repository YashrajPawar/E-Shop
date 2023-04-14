const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({

    quantity: {
        type: Number,
        required: true,
    },
    amount: {
        type: Number,
        required: true,
    },
    orderDate: {
        type: Date,
        default: () => Date.now(),
    },
    productId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Product",
        required: true,
    },
    shippingAddressId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Address",
        required: true,
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "userData",
        required: true,
    },

})

module.exports = mongoose.model('Order', orderSchema);