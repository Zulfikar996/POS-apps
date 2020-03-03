const express = require('express')
const route = express.Router()

const { cateAll, inputCategory, updateCategory, deleteCategory} = require('../Controllers/category')

route
    
    .get('/', cateAll)
    .post('/', inputCategory)
    .patch('/:categoryId', updateCategory)
    .delete('/:categoryId', deleteCategory)


    

module.exports = route