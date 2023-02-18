const { request } = require('express')
const express = require('express')
const multer = require('multer')
const sharp = require('sharp')
const router = new express.Router()
const Seller = require('../users/sellermodel')
const Product = require('../tasks/sellertask')
const { buyerAuth, sellerAuth } = require('../middleware/auth')


// SELLER ROUTES

// post request
// -signUp 
// -login
// -upload products

router.post('/seller/signup', async (req, res) => {
    const seller = new Seller(req.body)

    try {
        const sellerProfile = await seller.save()
        const token = await seller.generateAuthToken()
        res.cookie('auth', token, {
            maxAge: 1000 * 60 * 60 * 24 * 365,
            httpOnly: true
        })
        res.status(200).send({ sellerProfile, token })
    } catch (e) {
        res.status(400).send(e)
        console.log(e)
    }
})

router.post('/seller/login', async (req, res) => {
    try {
        const loggedInSeller = await Seller.findByCredentials(req.body.email, req.body.password)
        const token = await loggedInSeller.generateAuthToken()
        res.cookie('auth', token, {
            maxAge: 1000 * 60 * 60 * 24 * 365,
            httpOnly: true
        })
        res.send({ loggedInSeller, token })
    } catch (e) {
        res.status(400).send()
    }
})

router.post('/seller/logout', sellerAuth, async (req, res) => {
    try {
        req.seller.tokens = req.seller.tokens.filter((token) => {
            return token.token !== req.token
        })

        await req.seller.save()
        res.send({success: 'logged out'})
    } catch (e) {
        res.status(500).send()
    }
})

router.post('/seller/logoutAll', sellerAuth, async (req, res) => {
    try {
        req.seller.tokens = []
        await req.seller.save()
        res.send({success: 'logged out'})
    } catch (e) {
        res.status(500).send()
    }
})

router.post('/products', sellerAuth, async (req, res) => {
    const product = new Product({
        ...req.body,
        shopOwner: req.seller._id
    })

    try {
        const sellerProduct = await product.save()
        res.status(201).send(sellerProduct)
    } catch (e) {
        res.status(400).send(e)
    }
})


// get requests for seller
// - get profile
// - get products
// - get buyerRequest

router.get('/seller/profile', sellerAuth, async (req, res) => {
    res.send(req.seller)
})


router.get('/products', sellerAuth, async (req, res) => {
    const match = {}

    if (req.query.instock) {
        match.inStock = req.query.instock === 'true'
    }

    try {
        await req.seller.populate({
            path: 'products',
            match
        })
        res.status(200).send(req.seller.products)
    } catch (e) {
        res.status(500).send(e)
    }
})

router.get('/product/:id', sellerAuth, async (req, res) => {
    const _id = req.params.id
    try {
        const product = await Product.findOne({
            _id, shopOwner: req.seller._id
        })
        if (!product) {
            return res.status(400).send(e)
        }

        res.send(product)
    } catch (e) {
        res.status(500).send(e)
    }

})


// patch requests for seller
// - update profile
// - update products


router.patch('/sellerprofile/update', sellerAuth, async (req, res) => {
    const updates = Object.keys(req.body)
    const allowedUpdate = ['shopName', 'email', 'password', 'phoneNumber']
    const isValidOperation = updates.every((update) => {
        return allowedUpdate.includes(update)
    })

    if (!isValidOperation) {
        return res.status(400).send({ error: 'invalid update' })
    }

    try {
        updates.forEach((update) => {
            req.seller[update] = req.body[update]
        })

        await req.seller.save()
        res.send(req.seller)
    } catch (e) {
        res.status(400).send(e)
    }
})


router.patch('/product/:id', sellerAuth, async (req, res) => {
    const updates = Object.keys(req.body)
    const allowedUpdate = ['productName', 'availableSize', 'availableColor', 'price', 'category', 'inStock', 'description']
    const isValidOperation = updates.every((update) => {
        return allowedUpdate.includes(update)
    })

    if (!isValidOperation) {
        return res.status(400).send({ error: 'invalid update' })
    }

    try {
        const product = await Product.findOne({
            _id: req.params.id, shopOwner: req.seller._id
        })

        if (!product) {
            return res.status(400).send()
        }

        updates.forEach((update) => {
            product[update] = req.body[update]
        })

        await product.save()
        res.send(product)
    } catch (e) {
        res.status(400).send(e)
    }

})

// buyer delete 
// - delete profile
// - delete order


router.delete('/seller/profile', sellerAuth, async (req, res) => {
    try {
        await req.seller.remove()
        res.send(req.seller)
    } catch (e) {
        res.status(400).send(e)
    }
})


router.delete('/product/:id', sellerAuth, async (req, res) => {
    try {
        const deletedProduct = await Product.findOneAndDelete({
            _id: req.params.id, shopOwner: req.seller._id
        })

        if (!deletedProduct) {
            return res.status(400).send({ error: 'Authentication Error.' })
        }

        res.send(deletedProduct)
    } catch (e) {
        res.status(400).send(e)
    }
})

// UPLOADING,READINDING,UPDATING AND DELETING IMAGE

const upload = multer({
    limits: {
        fileSize: 10000000
    },
    fileFilter(req, file, cb) {
        if (!file.originalname.match(/\.(jpg|jpeg|png)$/)) {
            return cb(new Error('please upload an image'))
        }
        cb(undefined, true)
    }
})

router.post('/seller/product/picture/:id', sellerAuth, upload.single('productPic'), async (req, res) => {
    const buffer = await sharp(req.file.buffer).resize({
        width: 300,
        height: 300
    }).png().toBuffer()

    const product = await Product.findOne({
        _id: req.params.id,
        shopOwner: req.seller._id
    })

    

    if (!product) {
        return res.status(400).send(e)
    }

    product.productPic = buffer

    await product.save()
    res.send({success: 'uploaded'})
}, (error, req, res, next) => {
    res.status(400).send({ error: error.message })
})


router.delete('/seller/product/picture/delete', sellerAuth, async (req, res) => {
    const product = await Product.findOne({
        shopOwner: req.seller._id
    })

    if (!product) {
        return res.status(400).send(e)
    }

    product.productPic = undefined
    await product.save()
    res.send()
})

router.get('/product/:id/productpic', async (req, res) => {
    try {
        const product = await Product.findById(req.params.id)

        if (!product) {
            throw new Error()
        }

        res.set('Content-Type', 'image/png')
        res.send(product.productPic)
    } catch (e) {
        res.status(400).send({ e: 'unable to find image' })
    }
})


// public data (no auth)

router.get('/products/api/:category', async (req, res) => {
    try {
        const products = await Product.find({category: req.params.category})
        res.status(200).send(products)
    } catch (e) {
        res.status(500).send(e)
    }
})

router.get('/products/api/search/:productName', async (req, res) => {
    try {
        const products = await Product.find({productName: req.params.productName})
        res.status(200).send(products)
    } catch (e) {
        res.status(500).send(e)
    }
})

router.get('/product/api/:id', async (req, res) => {
    try {
        const product = await Product.findById({_id: req.params.id})
        res.status(200).send(product)
    } catch(e) {
        res.status(500).send(e)
    }
})







module.exports = router