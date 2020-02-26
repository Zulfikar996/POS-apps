const express = require('express')
const route = express.Router()
const productRouter = require('./product')
const categoryRouter = require('./category')
const userRouter = require('./user')
const purchaseRouter = require('./purchase')


route
    .use('/upload', express.static('./upload'))
    .use('/product', productRouter)
    .use('/category', categoryRouter)
    .use('/user', userRouter)
    .use('/purchase', purchaseRouter)

module.exports = route