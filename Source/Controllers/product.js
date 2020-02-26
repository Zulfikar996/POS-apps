const productModel = require('../Models/product')
const miscHelper = require('../Helpers')
module.exports = {
    getAll : async (request, response) => {
     try {
         const category = request.query.category || ''
         const searchName = request.query.name || ''
         const sortBy = request.query.sortBy || 'id'
         const limPro = request.query.limPro || 9999
         const page = request.query.page || '1'
         const result = await productModel.getAll(searchName, sortBy, limPro, page, category)
         miscHelper.response(response, 200, result)
     } catch (error) {
         miscHelper.customErrorResult(response, 404, 'Internal Server Error!')
       }   
    },
    getDetail : async (request, response) => {
        try {
            const productId = request.params.productId
            const result = await productModel.getDetail(productId)
            miscHelper.response(response, 200, result)
        } catch (error) {
            miscHelper.customErrorResult(response, 404, 'Internal Server Error!')
          }   
       },
    inputProduct : async (request, response) => {
        try {
            const { name, category, price, stock } = request.body
            const data = {
                name,
                category,
                price,
                stock,
                image : `http://localhost:4500/upload/${request.file.filename}`, 
                created_at : new Date(),
                updated_at : new Date()
                }
                const result = await productModel.inputProduct(data)
                miscHelper.response(response, 200, result)       
            } 
        catch (error) {
            miscHelper.customErrorResult(response, 404, 'Internal Server Error!')
          }   
       },
       updateProduct : async (request, response) => {
        try {
            const { name, category, price, stock } = request.body
            data = {
                name,
                category,
                price,
                stock,
                image : `http://localhost:4500/upload/${request.file.filename}`,
                updated_at : new Date()

            }
            const productId = request.params.productId
            const result = await productModel.updateProduct(data, productId)
            miscHelper.response(response, 200, result)
        } catch (error) {
            miscHelper.customErrorResult(response, 404, 'Internal Server Error!')
          }   
       },
       deleteProduct : async (request, response) => {
        try {
            const productId = request.params.productId
            const result = await productModel.deleteProduct(productId)
            miscHelper.response(response, 200, result)
        } catch (error) {
            miscHelper.customErrorResult(response, 404, 'Internal Server Error!')
          }   
       }
       
}