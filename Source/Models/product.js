const connection = require('../Configs/mysql')

module.exports = {
    getAll : (searchName, sortBy, limPro, page, category) => {
        return new Promise((resolve, reject) => {
            const firstProduct = ((limPro * page) - limPro)
            connection.query(`SELECT p.id, p.name, c.name as category, p.price, p.stock, p.image, p.created_at, 
                        p.updated_at FROM product p LEFT JOIN category c ON p.category = c.id WHERE p.name
                        LIKE '%${searchName}%' AND c.name LIKE '%${category}%' ORDER BY ${sortBy} ASC LIMIT ${firstProduct},${limPro}`, (error, result) => {
                if (error) reject(new Error(error))
                resolve(result)
            })
        })
    },
    getDetail : (productId) => {
        return new Promise((resolve, reject) => {
            connection.query('SELECT * FROM product WHERE id = ?', productId , (error, result) => {
                if (error) reject(new Error(error))
                resolve(result)
            })
        })
    },
    inputProduct : (data) => {
        return new Promise((resolve, reject) => {
            connection.query('INSERT INTO product SET ?', data, (error, result) => {
                if (error) reject(new Error(error))
                resolve(result)
            })
        })
    },
    updateProduct : (data, productId) => {
        return new Promise((resolve, reject) => {
            connection.query('UPDATE product SET ? WHERE id = ?', [data, productId], (error, result) => {
                if (error) reject(new Error(error))
                resolve(result)
            })
        })
    },
    deleteProduct : (productId) => {
        return new Promise((resolve, reject) => {
            connection.query('DELETE FROM product WHERE id = ?', productId , (error, result) => {
                if (error) reject(new Error(error))
                resolve(result)
            })
        })
    }
}