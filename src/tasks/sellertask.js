const mongoose = require('mongoose')


const productSchema = new mongoose.Schema({
    productName: {
        type: String,
        required: true,
        lowercase: true,
        trim: true
    },
    availableSize: {
        type: Array
    },
    availableColor: {
        type: Array
    },
    price: {
        type: Number,
        required: true
    },
    description: {
        type: String
    },
    category: {
        type: String,
        required: true,
        trim: true
    },
    inStock: {
        type: Number,
        default: 1
    },
    buyerRequest: {
        type: Number,
        default: 0
    },
    shopOwner: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'Seller'
    },
    productPic: {
        type: Buffer
    }
}, {
    timestamps: true
})


const Product = mongoose.model('Product', productSchema)


module.exports = Product