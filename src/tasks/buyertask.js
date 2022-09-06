const mongoose = require('mongoose')


const orderSchema = new mongoose.Schema({
    productName: {
        type: String,
        required: true,
        lowercase: true,
        trim: true
    },
    size: {
        type: String,
    },
    color: {
        type: String
    },
    price: {
        type: Number,
        required: true
    },
    quantity: {
        type: Number,
        default: 1
    },
    deliveryStatus: {
        type: Boolean,
        default: false
    },
    inCart: {
        type: Boolean,
        default: true
    },
    productId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true
    },
    sellerStock: {
        type: Number,
    },
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'Buyer'
    }
}, {
    timestamps: true
})


const Order = mongoose.model('Order', orderSchema)


module.exports = Order