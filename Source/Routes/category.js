const express = require('express')
const route = express.Router()

const { cateAll, inputCategory, updateCategory} = require('../Controllers/category')

route
    
    .get('/', cateAll)
    .post('/', inputCategory)
    .patch('/:categoryId', updateCategory)

    

module.exports = route