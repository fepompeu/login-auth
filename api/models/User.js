const { InvalidArgumentError } = require("../utils/errors");
const validation = require("../utils/validations");
const bcrypt = require("bcrypt");

class User {
  constructor(user) {
    this.id = user.id;
    this.email = user.email;
    this.passwordHash = user.passwordHash;
    this.createdAt = user.createdAt;
    this.updatedAt = user.updatedAt;

    this.validate();
  }

  async addHashPassword(password) {
    validation.fieldStringNotNull(password, "password");
    validation.fieldLengthMin(password, "password", 8);
    validation.fieldLengthMax(password, "password", 64);

    this.passwordHash = await User.generatePasswordHash(password);
  }

  validate() {
    validation.fieldStringNotNull(this.email, "email");
  }

  static generatePasswordHash(password) {
    const custHash = 12;
    return bcrypt.hash(password, custHash);
  }
}

module.exports = User;
