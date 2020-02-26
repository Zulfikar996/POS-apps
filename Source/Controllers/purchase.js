const models = require('../Models/purchase')
const helpers = require('../Helpers')

module.exports = {
    buy: async (request, response) => {
        try {
            const buy = request.body
            if (buy === undefined || buy === '') return console.log('Tidak ada data')

            var a = 0
            await buy.products.map(e => {
                const data = {
                    idBuyer: buy.idBuyer,
                    idProduct: e.idProduct,
                    stock: e.quantity
                }
                const date = {
                    date_added: new Date()
                }

                models.buy(data, a, date)
                a++
            })

            helpers.response(response, 200, 'terima kasih telah berbelanja!')
        } catch (error) {
            console.log(error)
            helpers.customErrorResponse(404, 'your request not found')
        }
    }
}