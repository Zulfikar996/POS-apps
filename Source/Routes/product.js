const express = require('express')
const route = express.Router()

// const {authentication, authorization} = require('../Helpers/auth')

const {getAll, getDetail, inputProduct, updateProduct, deleteProduct } = require('../Controllers/product')

// const { uploadImage } = require('../Controllers/upload')

route
    .get('/', getAll)
    .get('/:productId', getDetail)
    .post('/', inputProduct)
    .patch('/:productId', updateProduct)
    .delete('/:productId', deleteProduct)
    

module.exports = route