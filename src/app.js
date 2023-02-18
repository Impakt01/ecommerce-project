const express = require('express')
const mongoose = require('mongoose')
const ejs = require('ejs')
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')
const sellerRouter = require('./routers/sellerrouter')
const buyerRouter = require('./routers/buyerrouter')
const clientRouter = require('./routers/clientrouter')
const flutterwaveRouter = require('./routers/paymentAPIs')
const { findByIdAndUpdate, findByIdAndDelete } = require('./users/buyermodel')

const app = express()
app.use(cookieParser())

app.set('view engine', 'ejs')

app.use(express.json())
app.use(bodyParser.urlencoded({ extended: true }))

app.use(express.static('public'))

const port = process.env.PORT

mongoose.set('strictQuery', true)
mongoose.connect(process.env.MONGODB_CONNECT, {
    useNewUrlParser: true,
})

app.use(sellerRouter)
app.use(buyerRouter)
app.use(clientRouter)
app.use(flutterwaveRouter)



app.listen(port, () => {
    console.log('nicely done, next move please '+ port)
})