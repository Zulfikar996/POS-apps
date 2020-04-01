const models = require("../Models/purchase");
const helpers = require("../Helpers");
const uuid = require("uuid/v4");

module.exports = {
  buy: async (request, response) => {
    try {
      const buy = request.body;
      if (buy === undefined || buy === "") return console.log("Tidak ada data");

      var a = 0;
      const idBuyer = uuid();
      await buy.products.map(e => {
        const data = {
          idProduct: e.id,
          stock: e.qty
        };

        const result = models.buydetail(idBuyer, data, a);
        a++;
        if (result === "error") {
          helpers.response(response, 400, "false");
        }
        if (buy.products.length === a) {
          helpers.response(response, 200, "terima kasih telah berbelanja!");
        }
      });
    } catch (error) {
      console.log(error);
      helpers.customErrorResponse(404, "your request not found");
    }
  },
  history: async (request, response) => {
    try {
      const result = await models.history();
      helpers.response(response, 200, result);
    } catch (error) {
      console.log(error);
      helpers.customErrorResult(response, 404, "Internal Server Error!");
    }
  },
  historyDetail: async (request, response) => {
    try {
        const idBuyer = request.params.idBuyer
        const result = await models.historyDetail(idBuyer);
        helpers.response(response, 200, result);
      } catch (error) {
        console.log(error);
        helpers.customErrorResult(response, 404, "Internal Server Error!");
      }
  }
};
