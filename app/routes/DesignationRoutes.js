const express = require("express");
const router = express.Router();
var Designation_knex_controller = require("@/controller/Designation_knex_controller");

router
  .route("/designation")
  .post(Designation_knex_controller.addNewDesignation)
  .get(Designation_knex_controller.getAllDesignation);

router
  .route("/designation/:designation_id")
  .get(Designation_knex_controller.getSingleDesignation)
  .put(Designation_knex_controller.updateDesignation)
  .delete(Designation_knex_controller.deleteDesignation);

module.exports = router;
