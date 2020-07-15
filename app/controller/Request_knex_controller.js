"use strict";

exports.addNewRequest = (req, res) => {
  const {
    request_id,
    user_id,
    guest_comment,
    request_status,
    request_datetime,
  } = req.body;
  req.app
    .knexConnection("request")
    .insert({
      request_id: request_id,
      user_id: user_id,
      guest_comment: guest_comment,
      request_status: request_status,
      request_datetime: request_datetime,
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
        message: " Record failed to Insert",
        Records: err,
      });
    });
};

exports.getAllRequests = (req, res) => {
  req.app.knexConnection
    .select()
    .from("request")
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

exports.getSingleRequest = (req, res) => {
  req.app.knexConnection
    .select()
    .from("request")
    .where("request_id", [req.params.request_id])
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

exports.deleteRequest = (req, res) => {
  req.app.knexConnection
    .delete()
    .from("request")
    .where("request_id ", [req.params.request_id])
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

exports.updateRequest = (req, res) => {
  const {
    request_id,
    user_id,
    guest_comment,
    request_status,
    request_datetime,
  } = req.body;
  req.app;
  req.app
    .knexConnection("request")
    .where({ request_id: request_id })
    .update({
      user_id: user_id,
      guest_comment: guest_comment,
      request_status: request_status,
      request_datetime: request_datetime,
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
