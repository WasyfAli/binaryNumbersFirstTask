const express = require("express");
const router = express.Router();
var knex_user_controller = require("@/controller/knex_user_controller");
// route_check_connection Routes
router
  .route("/knexapi/users")
  .get(knex_user_controller.getAllUsers)
  .post(knex_user_controller.createAUser)
  .put(knex_user_controller.updateAUser);
router
  .route("/knexapi/userswithroles")
  .get(knex_user_controller.getUsersWithRole);

module.exports = router;
