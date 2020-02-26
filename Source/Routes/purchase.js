const express = require('express')
const route = express.Router()

const { buy } = require('../Controllers/purchase')

route
    .post('/', buy)

module.exports = route