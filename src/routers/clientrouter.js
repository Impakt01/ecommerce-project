const express = require('express')
const router = new express.Router()
const http = require('http')


const serverData = []

router.get('/', (req, res) => {
    res.render('index')
})

router.get('/:parameter', (req, res) => {

    if (req.params.parameter === 'cart') {
        const paypalId = process.env.PAYPAL_CLIENT_ID
        return res.render('cart', {
            clientId: paypalId
        })
    } else if (req.params.parameter === 'sign_up') {
        return res.render('sign_up')
    } else if (req.params.parameter === 'sign_in_seller') {
        return res.render('sign_in_seller')
    } else if (req.params.parameter === 'sign_in_buyer') {
        return res.render('sign_in_buyer')
    } else if (req.params.parameter === 'updatebuyerprofile') {
        return res.render('updatebuyerprofile')
    } else if (req.params.parameter === 'buyer_act') {
        return res.render('buyer_act')
    } else if (req.params.parameter === 'seller_act') {
        return res.render('seller_act')
    } else if (req.params.parameter === 'product_details') {
        return res.render('product_details')
    } else if (req.params.parameter === 'uploadproduct') {
        return res.render('uploadproduct')
    } else if (req.params.parameter === 'updatesellerprofile') {
        return res.render('updatesellerprofile')
    } else if (req.params.parameter === 'editproduct') {
        return res.render('editproduct')
    } else if (req.params.parameter === 'search_result') {
        return res.render('search_result')
    }
    else {
        return res.render('category')
    }

})







module.exports = router