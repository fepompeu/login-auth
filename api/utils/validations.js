const { InvalidArgumentError } = require("./errors");

module.exports = {
  fieldStringNotNull: (value, name) => {
    if (typeof value !== "string" || value === 0)
      throw new InvalidArgumentError(
        `It's necessary to fill the field ${name}!`
      );
  },

  fieldLengthMin: (value, name, min) => {
    if (value.length < min)
      throw new InvalidArgumentError(
        `The field ${name} is necessary to be bigger than ${min} char!`
      );
  },

  fieldLengthMax: (value, name, max) => {
    if (value.length > max)
      throw new InvalidArgumentError(
        `The field ${name} is necessary to be fewer than ${max} char!`
      );
  },
};
