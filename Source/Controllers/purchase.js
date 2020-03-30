const models = require('../Models/purchase')
const helpers = require('../Helpers')

module.exports = {
    buy: async (request, response) => {
        try {
            const buy = request.body
            if (buy === undefined || buy === '') return console.log('Tidak ada data')

            var a = 0
            await buy.products.map( async e => {
                const data = {
                    idBuyer: buy.idBuyer,
                    idProduct: e.idProduct,
                    stock: e.quantity
                }
                const date = {
                    date_added: new Date()
                }

                const result = await models.buy(data, a, date)
                if(result === 'error'){
                helpers.response(response, 400, 'false')}
                a++
                if(buy.products.length === a){
                    helpers.response(response, 200, 'terima kasih telah berbelanja!')
                }
            })

        } catch (error) {
            console.log(error)
            helpers.customErrorResponse(404, 'your request not found')
        }
    }
}