const express = require("express");
const router = express.Router();
const Request_knex_controller = require("@/controller/Request_knex_controller");

router
  .route("/request")
  .post(Request_knex_controller.addNewRequest)
  .get(Request_knex_controller.getAllRequests);

router
  .route("/request/:request_id")
  .get(Request_knex_controller.getSingleRequest)
  .delete(Request_knex_controller.deleteRequest)
  .put(Request_knex_controller.updateRequest);

module.exports = router;
