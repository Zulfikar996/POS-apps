const express = require('express')
const route = express.Router()

const { register, login, getUser } = require('../Controllers/user')

route
    .post('/registrasi', register )
    .post('/login', login)
    .get('/', getUser)

module.exports = route