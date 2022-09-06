const express = require('express')
const router = new express.Router()
const Buyer = require('../users/buyermodel')
const Order = require('../tasks/buyertask')
const {buyerAuth, sellerAuth} = require('../middleware/auth')

// BUYER ROUTES


// buyer post requests
// - signUP 
// - order

router.post('/buyer/signup', async (req, res) => {
    const buyer = new Buyer(req.body)

    try {
        const buyerProfile = await buyer.save()
        const token = await buyer.generateAuthToken()
        res.cookie('auth', token, {
            maxAge: 1000*60*60*24*365,
            httpOnly: true
        })
        res.status(200).send({buyerProfile, token})
    } catch (e) {
        res.status(400).send(e)
    }
})

router.post('/orders', buyerAuth, async (req, res) => {
    const order = new Order({
        ...req.body,
        owner:  req.buyer._id
    })

    try {
        const buyerOrder = await order.save()
        res.status(201).send(buyerOrder)
    } catch (e) {
        res.status(400).send(e)
    }
})

router.post('/buyer/logout', buyerAuth, async (req, res) => {
    try {
        req.buyer.tokens = req.buyer.tokens.filter((token) => {
            return token.token !== req.token
        })

        await req.buyer.save()
        res.send({success: 'logged out'})
    } catch(e) {
        res.status(500).send()
    }
})

router.post('/buyer/logoutAll', buyerAuth, async (req, res) => {
    try {
        req.buyer.tokens = []
        await req.buyer.save()
        res.send({success: 'logged out'})
    } catch (e) {
        res.status(500).send()
    }
})

router.post('/buyer/login', async (req, res) => {
    try {
        const loggedInbuyer = await Buyer.findByCredentials(req.body.email, req.body.password)
        const token = await loggedInbuyer.generateAuthToken()
        res.cookie('auth', token, {
            maxAge: 1000*60*60*24*365,
            httpOnly: true
        })
        res.send({loggedInbuyer, token})
    } catch (e) {
        res.status(400).send()
    }
})


// get requests for buyer
// - get profile
// - get orders
// - get cart

router.get('/buyer/profile', buyerAuth, async (req, res) => {
    res.send(req.buyer)
})


router.get('/orders', buyerAuth, async (req, res) => {
    match = {}

    if (req.query.deliveryStatus || req.query.incart) {
        match.deliveryStatus = req.query.deliveryStatus === 'true',
        match.inCart = req.query.incart === 'true'
    }

    try {
        // const orders = await Order.find({})
        await req.buyer.populate({
            path: 'orders',
            match
        })
        res.status(200).send(req.buyer.orders)
    } catch (e) {
        res.status(500).send(e)
    }
})

router.get('/order/:id', buyerAuth, async (req, res) => {
        const _id = req.params.id
    try {
        const order = await Order.findOne({ 
            _id, owner: req.buyer._id
         })
        if (!order) {
           return res.status(400).send(e)
        }
        res.send(order)
    } catch(e) {
        res.status(500).send(e)
    }
    
})


// patch requests for buyer
// - update profile
// - update orders


router.patch('/buyerprofile/update', buyerAuth, async (req, res) => {
    const updates = Object.keys(req.body)
    const allowedUpdate = ['name', 'email', 'password', 'phoneNumber', 'location']
    const isValidOperation = updates.every((update) => {
        return allowedUpdate.includes(update)
    })

    if (!isValidOperation) {
        return res.status(400).send({error: 'invalid update'})
    }

    try {
        updates.forEach((update) => {
            req.buyer[update] = req.body[update]
        })

        await req.buyer.save()
        res.send(req.buyer)
    } catch (e) {
        res.status(400).send(e)
    }
})


router.patch('/order/:id', buyerAuth, async (req, res) => {
    const updates = Object.keys(req.body)
    const allowedUpdate = ['productName', 'size', 'color', 'price', 'deliveryStatus', 'quantity', 'inCart']
    const isValidOperation = updates.every((update) => {
        return allowedUpdate.includes(update)
    })

    if (!isValidOperation) {
        return res.status(400).send({error: 'invalid update'})
    }

    try {
        const order = await Order.findOne({
            _id: req.params.id, owner: req.buyer._id
        })
    
        if(!order) {
            return res.status(400).send()
        } 

        updates.forEach((update) => {
            order[update] = req.body[update]
        })
        await order.save()
        
        res.send(order)
    } catch (e) {
        res.status(400).send(e)
    }

})

// buyer delete 
// - delete profile
// - delete order


router.delete('/buyer/profile', buyerAuth, async (req, res) => {
    try {
        await req.buyer.remove()
        res.send(req.buyer)
    } catch (e) {
        res.status(400).send(e)
    }
})


router.delete('/order/:id', buyerAuth, async (req, res) => {
    try {
        const deletedOrder = await Order.findOneAndDelete({
            _id: req.params.id, owner: req.buyer._id
        })

        if (!deletedOrder) {
            return res.status(400).send({error: 'Authentication Error'})
        }

        res.send(deletedOrder)
    } catch (e) {
        res.status(400).send(e)
    }
})


module.exports = router