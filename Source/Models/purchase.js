const con = require('../Configs/mysql')

module.exports = {
    buy: (data, a, date) => {
        return new Promise((resolve, reject) => {
            con.query(`SELECT * FROM product WHERE id= ${data.idProduct}`, (error, result) => {
                if (error) reject(new Error(error))
                else{
                    var stock = result[0].stock - data.stock
                    var price = result[0].price * data.stock

                    if (a == 0) { con.query(`INSERT INTO purchase SET ?, idBuyer=${data.idBuyer}, totalPayment=0`, date) }

                    con.query(`UPDATE product SET stock = ${stock} WHERE id=${data.idProduct}`, (error, result) => {
                        if (error) {reject(new Error(error))}
                        else
                            {con.query(`INSERT INTO purchase_detail SET ? , price = ${price}`, data, (error, result) => {
                                con.query(`SELECT sum(price) as totalPrice FROM purchase_detail WHERE idBuyer=${data.idBuyer}`, (error, result) => {
                                    if (error) reject(new Error(error))
                                    const newP = result[0].totalPrice
                                    con.query(`UPDATE purchase SET totalPayment = ${newP} WHERE idBuyer=${data.idBuyer}`, (error, result) => {
                                        if (error) reject(new Error(error))
                                        resolve(result)
                                    })
                                })
                        })}
                    })
                }
                    
                 
            })
        })
    }
}