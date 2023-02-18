const express = require('express')
// const got = require('got')
const router = new express.Router()
const fetch = require('node-fetch')

router.post('/checkout', async (req, res) => {
    try {

        const body = {
                tx_ref: req.body.phoneNumber,
                amount: req.body.price,
                currency: "NGN",
                redirect_url: "http://localhost:3000",
                customer: {
                    email: req.body.email,
                    phonenumber: req.body.phoneNumber,
                    name: req.body.name
                }}

        const response = await fetch('https://api.flutterwave.com/v3/payments', {
            method: 'post',
	        body: JSON.stringify(body),
	        headers: {'Content-Type': 'application/json',
             Authorization: `Bearer ${process.env.FLW_SECRET_KEY}`}
        })

        const data = await response.json();
        res.send(data)
    } catch(e) {
        console.log(e)
    }
})

// router.post('/checkout', async (req, res) => {
//     console.log(req.body)
//     try {

//         const response = await got.post('https://api.flutterwave.com/v3/payments', {
//             headers: {
//                 Authorization: `Bearer ${process.env.FLW_SECRET_KEY}`
//             },
//             json: {
//                 tx_ref: req.body.phoneNumber,
//                 amount: req.body.price,
//                 currency: "NGN",
//                 redirect_url: "http://localhost:3000",
//                 customer: {
//                     email: req.body.email,
//                     phonenumber: req.body.phoneNumber,
//                     name: req.body.name
//                 }
//             }
//         }).json()

//         res.send(response)

//     } catch (e) {
//         res.send({err: 'error occured'})
//         console.log(e)
//     }
// })










module.exports = router