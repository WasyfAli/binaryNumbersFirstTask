"use strict";

const { response } = require("express");

//Add new City
exports.addNewCity = (req, res) => {
  const { city_id, latitude, longitude, city_name } = req.body;
  req.app
    .knexConnection("cities")
    .insert({
      city_id: city_id,
      latitude: latitude,
      longitude: longitude,
      city_name: city_name,
    })
    .then((response) => {
      res.status(200).json({
        status: true,
        message: "Record Inserted Successfully",
        Records: response,
      });
    })
    .catch((err) => {
      res.status(200).json({
        status: false,
        message: "Record Insertion Failed",
        Records: err,
      });
    });
};

//get All City
exports.getAllCity = (req, res) => {
  req.app.knexConnection
    .select()
    .from("cities")
    .then((response) => {
      res.status(200).json({
        status: true,
        message: "All Records fetched Successfully",
        Records: response,
      });
    })
    .catch((err) => {
      res.status(200).json({
        status: false,
        message: "Redords failed to fetch",
        Records: err,
      });
    });
};

//get Single City
exports.getSingleCity = (req, res) => {
  req.app.knexConnection
    .select()
    .from("cities")
    .where("city_id ", [req.params.city_id])
    .then((response) => {
      res.status(200).json({
        status: true,
        message: "Record fetched Successfully",
        Records: response,
      });
    })
    .catch((err) => {
      res.status(200).json({
        status: false,
        message: "Redord failed to fetch",
        Records: err,
      });
    });
};

//delete city
exports.deleteCity = (req, res) => {
  req.app.knexConnection
    .delete()
    .from("cities")
    .where("city_id ", [req.params.city_id])
    .then((response) => {
      res.status(200).json({
        status: true,
        message: "Record Deleted Successfully",
        Records: response,
      });
    })
    .catch((err) => {
      res.status(200).json({
        status: false,
        message: "Record failed to Delete",
        Records: err,
      });
    });
};

//Update city information
exports.updateCity = (req, res) => {
  const { city_id, latitude, longitude, city_name } = req.body;
  req.app
    .knexConnection("cities")
    .where({ city_id: city_id })
    .update({
      latitude: latitude,
      longitude: longitude,
      city_name: city_name,
    })
    .then((response) => {
      res.status(200).json({
        status: true,
        message: "Record Updated Successfully",
        Records: response,
      });
    })
    .catch((err) => {
      res.status(200).json({
        status: false,
        message: "Records Failed to Update",
        Records: err,
      });
    });
};
