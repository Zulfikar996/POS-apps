const con = require("../Configs/mysql");

module.exports = {
  buydetail: (idBuyer, data, a, date) => {
    return new Promise((resolve, reject) => {
      con.query(
        `SELECT * FROM product WHERE id= ${data.idProduct}`,
        (error, result) => {
          if (error) reject(new Error(error));
          else {
            var stock = result[0].stock - data.stock;
            var price = result[0].price * data.stock;
            if (stock <= 0) {
              resolve("error");
            } else {
              if (a == 0) {
                con.query(
                  "INSERT INTO purchase (idBuyer, totalPayment) VALUES ('" +
                    idBuyer +
                    "', '" +
                    0 +
                    "')"
                );
              }
              con.query(
                `UPDATE product SET stock = ${stock} WHERE id=${data.idProduct}`,
                (error, result) => {
                  if (error) {
                    reject(new Error(error));
                  } else {
                    con.query(
                      `INSERT INTO purchase_detail SET ? , price = ${price}, idBuyer='${idBuyer}'`,
                      data,
                      (error, result) => {
                        con.query(
                          `SELECT sum(price) as totalPrice FROM purchase_detail WHERE idBuyer='${idBuyer}'`,
                          (error, result) => {
                            if (error) reject(new Error(error));
                            const total = result[0].totalPrice;
                            con.query(
                              `UPDATE purchase SET totalPayment = ${total} WHERE idBuyer='${idBuyer}'`,
                              (error, result) => {
                                if (error) reject(new Error(error));
                                resolve(result);
                              }
                            );
                          }
                        );
                      }
                    );
                  }
                }
              );
            }
          }
        }
      );
    });
  },
  history: () => {
    return new Promise((resolve, reject) => {
      con.query(`SELECT * FROM purchase`, (error, result) => {
        if (error) reject(new Error(error));
        resolve(result);
      });
    });
  },
  historyDetail: (idBuyer) => {
    return new Promise((resolve, reject) => {
      con.query(`SELECT * FROM purchase_detail WHERE idBuyer = '${idBuyer}' `, (error, result) => {
        if (error) reject(new Error(error));
        resolve(result);
      });
    });
  }
};
