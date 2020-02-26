const express = require('express')
const route = express.Router()

const { register, login } = require('../Controllers/user')

route
    .post('/registrasi', register )
    .post('/login', login)

module.exports = route