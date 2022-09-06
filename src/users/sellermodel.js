const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const Product = require('../tasks/sellertask')
const validator = require('validator')


const sellerSchema = new mongoose.Schema({
    shopName: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        unique: true,
        required: true,
        lowercase: true,
        validate(value) {
            if (!validator.isEmail(value)) {
                throw new Error('Email invalid')
            }
        },
        trim: true
    },
    password: {
        type: String,
        trim: true,
        required: true,
        minlength: 7,
        validate(value) {
            if (value.toLowerCase().includes('password')) {
                throw new Error('password should not contain "password"')
            }
        }
    },
    phoneNumber: {
        type: String,
        required: true
    },
    tokens: [
        {
            token:  {
                type: String,
                required: true
            }
        }
    ]
}, {
    timestamps: true
}, )

sellerSchema.virtual('products', {
    ref: 'Product',
    localField: '_id',
    foreignField: 'shopOwner'
})

sellerSchema.methods.toJSON = function () {
    const seller = this
    const sellerObject = seller.toObject()
    

    delete sellerObject.password
    delete sellerObject.tokens
    delete sellerObject.productPic

    return sellerObject
}

sellerSchema.methods.generateAuthToken = async function () {
    const seller = this
    const token = jwt.sign({_id: seller._id.toString()}, process.env.JWT_SECRET)

    seller.tokens = seller.tokens.concat({token
    })
    await seller.save()
    return token
}

sellerSchema.statics.findByCredentials = async (email, password) => {
    const seller = await Seller.findOne({
        email
    })

    if (!seller) {
        throw new Error('unable to login. Please check your email or password')
    }

    const isMatch = await bcrypt.compare(password, seller.password)

    if (!isMatch) {
        throw new Error('unable to login')
    }

    return seller
}

sellerSchema.pre('save', async function (next) {
    const seller = this

    if (seller.isModified('password')) {
        seller.password = await bcrypt.hash(seller.password, 8)
    }

    next()
})

sellerSchema.pre('remove', async function (next) {
    const seller = this
    await Product.deleteMany({ shopOwner: seller._id})
    next()
})


const Seller = mongoose.model('Seller', sellerSchema)


module.exports = Seller