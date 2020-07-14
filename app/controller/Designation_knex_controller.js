"use strict";

//Add designation
exports.addNewDesignation = (req, res) => {
  const {
    designation_id,
    designation_name,
    designation_description,
    company_id,
    designation_active,
    created_date,
    modified_date,
    created_by,
    modified_by,
  } = req.body;

  req.app
    .knexConnection(`designation`)
    .insert({
      designation_id: designation_id,
      designation_name: designation_name,
      designation_description: designation_description,
      company_id: company_id,
      designation_active: designation_active,
      created_date: created_date,
      modified_date: modified_date,
      created_by: created_by,
      modified_by: modified_by,
    })
    .then((response) => {
      res.status(200).json({
        status: true,
        message: "Record inserted Succesfully",
        Records: response,
      });
    })
    .catch((err) => {
      res.status(200).json({
        status: true,
        message: "Record Failed to Insert",
        Records: err,
      });
    });
};

//get All designation
exports.getAllDesignation = (req, res) => {
  req.app.knexConnection
    .select()
    .from("designation")
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

//get Single designation
exports.getSingleDesignation = (req, res) => {
  req.app.knexConnection
    .select()
    .from("designation")
    .where("designation_id ", [req.params.designation_id])
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

//delete designation
exports.deleteDesignation = (req, res) => {
  req.app.knexConnection
    .delete()
    .from("designation")
    .where("designation_id ", [req.params.designation_id])
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

//Update designation information
exports.updateDesignation = (req, res) => {
  const {
    designation_id,
    designation_name,
    designation_description,
    company_id,
    designation_active,
    created_date,
    modified_date,
    created_by,
    modified_by,
  } = req.body;
  req.app
    .knexConnection("designation")
    .where({ designation_id: designation_id })
    .update({
      designation_name: designation_name,
      designation_description: designation_description,
      company_id: company_id,
      designation_active: designation_active,
      created_date: created_date,
      modified_date: modified_date,
      created_by: created_by,
      modified_by: modified_by,
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
