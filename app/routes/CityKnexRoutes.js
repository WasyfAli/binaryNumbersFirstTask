const express = require("express");
const router = express.Router();
var City_knex_controller = require("@/controller/City_knex_controller");

router
  .route("/city")
  .post(City_knex_controller.addNewCity)
  .get(City_knex_controller.getAllCity);

router
  .route("/city/:city_id")
  .get(City_knex_controller.getSingleCity)
  .put(City_knex_controller.updateCity)
  .delete(City_knex_controller.deleteCity);

module.exports = router;
