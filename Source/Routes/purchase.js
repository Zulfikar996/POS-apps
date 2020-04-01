const express = require('express')
const route = express.Router()

const { buy, history, historyDetail } = require('../Controllers/purchase')

route
    .post('/', buy)
    .get('/', history )
    .get('/:idBuyer', historyDetail)

module.exports = route