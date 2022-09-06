const express = require('express')
const got = require('got')
const router = new express.Router()



router.post('/checkout', async (req, res) => {
    try {

        const response = await got.post('https://api.flutterwave.com/v3/payments', {
            headers: {
                Authorization: `Bearer ${process.env.FLW_SECRET_KEY}`
            },
            json: {
                tx_ref: req.body.phoneNumber,
                amount: req.body.price,
                currency: "NGN",
                redirect_url: "http://localhost:3000",
                customer: {
                    email: req.body.email,
                    phonenumber: req.body.phoneNumber,
                    name: req.body.name
                }
            }
        }).json()

        res.send(response)

    } catch (e) {
        console.log(err.code);
        console.log(err.response.body);
    }
})










module.exports = router