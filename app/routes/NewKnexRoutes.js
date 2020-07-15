const express = require("express");
const router = express.Router();
var New_knex_controller = require("@/controller/New_knex_controller");
const {
  isSignedIn,
  isAuthenticated,
} = require("../controller/New_knex_controller");

router
  .route("/register")
  .get(New_knex_controller.getAllUser) //Hitting this route will make xlsx file
  .post(New_knex_controller.signup);

router.route("/signin").post(New_knex_controller.signin);

module.exports = router;
