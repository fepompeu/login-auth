const database = require("../database/models");
const User = require("../models/User");
const jwt = require("jsonwebtoken");

function createTokenJWT(user) {
  const payload = {
    id: user.id,
  };

  const token = jwt.sign(payload, process.env.JWT_KEY, { expiresIn: "15m" });
  return token;
}

class LoginController {
  static async listUsers(req, res) {
    try {
      const allUsers = await database.Users.findAll();
      return res.status(200).json(allUsers);
    } catch (error) {
      return res.status(500).json(error.message);
    }
  }

  static async addUser(req, res) {
    const body = req.body;
    try {
      const user = new User(body);

      await user.addHashPassword(body.password);

      const allUsers = await database.Users.create(user);

      return res.status(200).json(allUsers);
    } catch (error) {
      return res.status(500).json(error.message);
    }
  }

  static login(req, res) {
    const token = createTokenJWT(req.user);
    // working
  }
}

module.exports = LoginController;
