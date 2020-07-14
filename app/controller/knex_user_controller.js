"use strict";

exports.getAllUsers = function (req, res) {
  req.app.knexConnection
    .select()
    .from("users")
    .then((users) => {
      res.status(200).json({
        status: true,
        message: "Records Fetched",
        Records: users,
      });
    })
    .catch((err) => {
      res.status(200).json({
        status: false,
        message: "Records Failed to fetch",
        Records: err,
      });
    });
};

exports.createAUser = function (req, res) {
  req.app
    .knexConnection("users")
    .insert({
      username: req.body.username,
      first_name: req.body.first_name,
      email_id: req.body.email_id,
      //password: password,
    })
    .then((response) => {
      res.status(200).json({
        status: true,
        message: "Record Inserted",
        Records: response,
      });
    })
    .catch((err) => {
      res.status(200).json({
        status: false,
        message: "Records Failed to insert",
        Records: err,
      });
    });
};

exports.updateAUser = function (req, res) {
  req.app
    .knexConnection("users")
    .where({ user_id: req.body.user_id })
    .update({
      username: req.body.username,
      first_name: req.body.first_name,
      email_id: req.body.email_id,
    })
    .then((response) => {
      res.status(200).json({
        status: true,
        message: "Record Inserted",
        Records: response,
      });
    })
    .catch((err) => {
      res.status(200).json({
        status: false,
        message: "Records Failed to insert",
        Records: err,
      });
    });
};

exports.getUsersWithRole = function (req, res) {
  req.app.knexConnection
    .select("*")
    .from("users")
    .join("user_roles as ur", "users.user_id", "ur.user_id")
    .join("ms_roles as r", "r.role_id", "ur.role_id")
    .then((users) => {
      res.status(200).json({
        status: true,
        message: "Records Fetched",
        Records: users,
      });
    })
    .catch((err) => {
      res.status(200).json({
        status: false,
        message: "Records Failed to fetch",
        Records: err,
      });
    });
};
