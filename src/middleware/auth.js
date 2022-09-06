const jwt = require('jsonwebtoken')
const Buyer = require('../users/buyermodel')
const Seller = require('../users/sellermodel')
const { findOne } = require('../users/sellermodel')

const buyerAuth = async (req, res, next) => {

    try {
        // const token = req.header('Authorization').replace('Bearer ', '')
        const token = req.cookies.auth
        const decoded = jwt.verify(token, process.env.JWT_SECRET)
        const buyer = await Buyer.findOne({ _id: decoded._id, 'tokens.token': token })

        if (!buyer) {
            throw new Error()
        }

        req.token = token
        req.buyer = buyer
        next()
    } catch (e) {
        res.status(401).send({ error: 'please authenticate.' })
    }
}

const sellerAuth = async (req, res, next) => {

    try {
        // const token = req.header('Authorization').replace('Bearer ', '')
        const token = req.cookies.auth
        const decoded = jwt.verify(token, process.env.JWT_SECRET)
        const seller = await Seller.findOne({ _id: decoded._id, 'tokens.token': token })

        if (!seller) {
            throw new Error()
        }

        req.token = token
        req.seller = seller
        next()
    } catch (e) {
        res.status(401).send({ error: 'please authenticate.' })
    }
}


module.exports = {
    buyerAuth,
    sellerAuth
}