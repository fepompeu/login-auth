const loginRoute = require("./loginRoute");

module.exports = (app) => {
  app.use(loginRoute);
};
