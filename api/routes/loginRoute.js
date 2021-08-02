const { Router } = require("express");
const LoginController = require("../controllers/LoginController");
const Authentication = require("../controllers/Authentication");

const router = Router();

router.post("/user/login", Authentication.local, LoginController.login);

// router.get("/user/login", LoginController.logout);

router
  .route("/user")
  .post(LoginController.addUser)
  .get(LoginController.listUsers);

// router.delete("/user/:id", LoginController.delete);

module.exports = router;
