require("dotenv").config();
const express = require("express");

const app = express();
app.use(express.json());

const authenticationStrategy = require("./authentication/authenticationStrategy");

const routes = require("./routes");
routes(app);

app.listen(process.env.PORT, () => {
  console.log(`The API has been started on port ${process.env.PORT}!`);
});
