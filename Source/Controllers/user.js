const userModel = require("../Models/user");
const helper = require("../Helpers");
const JWT = require("jsonwebtoken");
const { JWT_KEY } = require("../Configs");
const miscHelper = require("../Helpers");

module.exports = {
  register: async (request, response) => {
    try {
      const salt = helper.generateSalt(18);
      const hashPassword = helper.setPassword(request.body.password, salt);
      const data = {
        name: request.body.name,
        Status: request.body.Status,
        email: request.body.email,
        salt: hashPassword.salt,
        password: hashPassword.passwordHash,
        created_at: new Date(),
        updated_at: new Date()
      };
      const result = await userModel.register(data);
      data.id = result.insertId;
      response.json(data);
    } catch (error) {
      console.log(error);
    }
  },
  login: async (request, response) => {
    const data = {
      password: request.body.password,
      email: request.body.email
    };

    const emailValid = await userModel.checkEmail(data.email);
    const dataUser = emailValid[0];
    const hashPassword = helper.setPassword(data.password, dataUser.salt);

    if (hashPassword.passwordHash === dataUser.password) {
      const token = JWT.sign(
        {
          email: dataUser.email,
          id: dataUser.id
        },
        JWT_KEY,
        { expiresIn: "5h" }
      );

      delete dataUser.salt;
      delete dataUser.password;

      dataUser.token = token;

      response.json(dataUser);
    } else {
      response.json({ message: "Login error!" });
    }
  },
  getUser: async (request, response) => {
    try {
      const searchName = request.query.name || "";
      const result = await userModel.getUser(searchName);
      miscHelper.response(response, 200, result);
    } catch (error) {
      miscHelper.customErrorResult(response, 404, "cannot get user");
    }
  }
};
