const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const Order = require('../tasks/buyertask')
const validator = require('validator')

const buyerSchema = new mongoose.Schema({
    name: {
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
    location: {
        type: String,
        required: true,
    },
    tokens: [
        {
            token:  {
                type: String,
                required: true
            }
        }
    ],
    productId: {
        type: mongoose.Schema.Types.ObjectId
    }
}, {
    timestamps: true
})

buyerSchema.virtual('orders', {
    ref: 'Order',
    localField: '_id',
    foreignField: 'owner'
})

buyerSchema.methods.toJSON = function () {
    const buyer = this
    const buyerObject = buyer.toObject()
    

    delete buyerObject.password
    delete buyerObject.tokens
    return buyerObject
}

buyerSchema.methods.generateAuthToken = async function () {
    const buyer = this
    const token = jwt.sign({_id: buyer._id.toString()}, process.env.JWT_SECRET)

    buyer.tokens = buyer.tokens.concat({token
    })
    await buyer.save()
    return token
}

buyerSchema.statics.findByCredentials = async (email, password) => {
    const buyer = await Buyer.findOne({
        email
    })

    if (!buyer) {
        throw new Error('unable to login. Please check your email or password')
    }

    const isMatch = await bcrypt.compare(password, buyer.password)

    if (!isMatch) {
        throw new Error('unable to login')
    }

    return buyer
}


// harshing password before saving
buyerSchema.pre('save', async function (next) {
    const buyer = this

    if (buyer.isModified('password')) {
        buyer.password = await bcrypt.hash(buyer.password, 8)
    }

    next()
})


buyerSchema.pre('remove', async function (next) {
    const buyer = this
    await Order.deleteMany({ owner: buyer._id})
    next()
})


const Buyer = mongoose.model('Buyer', buyerSchema)


module.exports = Buyer