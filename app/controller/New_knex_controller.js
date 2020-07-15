"use strict";
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const expressJwt = require("express-jwt");
const excel = require("exceljs");
const PDFDocument = require("pdfkit");
const fs = require("fs");
const secret = require("../config/keys").SECRET;
//signup
exports.signup = (req, res) => {
  const { username, email, password } = req.body;

  bcrypt.genSalt(10, (err, salt) => {
    bcrypt.hash(password, salt, (err, hash) => {
      if (err) {
        throw err;
      }
      let password = hash;

      req.app
        .knexConnection("mynewuser")
        .insert({
          username: username,
          email: email,
          password: password,
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
    });
  });
};

//signin
exports.signin = (req, res) => {
  const { email, password } = req.body;
  req.app.knexConnection
    .select("*")
    .from("mynewuser")
    .where(`email  `, [email])
    .then((user) => {
      if (!user) {
        res.status(404).json({
          status: false,
          message: "Records Failed to fetch",
        });
      }
      // console.log(user[0].password);
      //Check password
      bcrypt
        .compare(password, user[0].password)
        .then((isMatch) => {
          if (isMatch) {
            //User Matched

            // res.status(200).json({
            //   message: "Password Match",
            // });

            const payload = {
              username: user.username,
            };

            jwt.sign(payload, secret, { expiresIn: 3600 }, (err, token) => {
              //will have to store this token in clients browsers
              res.json({
                success: true,
                token: `Bearer ` + token,
              });
            });
          } else {
            res.status(400).json({
              status: false,
              message: "Check Email & Password",
            });
          }
        })
        .catch();
    })
    .catch();
};

//Get All Users & also creates File
exports.getAllUser = (req, res) => {
  req.app
    .knexConnection("mynewuser")
    .select()
    .from("mynewuser")
    .then((users) => {
      //Saving information into Excel File & creating PDF

      let workbook = new excel.Workbook(); //Creating workbook

      const stringifiedUser = JSON.stringify(users);
      const doc = new PDFDocument(); //Creating a document

      doc.pipe(fs.createWriteStream("user.pdf"));

      //rendering user information to pdf

      doc.text(stringifiedUser);

      doc.end();

      let worksheet = workbook.addWorksheet("Users"); //Will create worksheet

      //Defining Worksheet Headders
      worksheet.columns = [
        { header: "UserName", key: "username", width: 30 },
        { header: "Email", key: "email", width: 30 },
        { header: "Password", key: "password", width: 70 },
      ];

      //Adding array rows
      worksheet.addRows(users);

      //Writing Into file
      workbook.xlsx
        .writeFile("user.xlsx")
        .then(() => {
          console.log("File Saved SuccessFully!");
        })
        .catch((err) => {
          console.log(err);
        });

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

//Protected Middlewares

// exports.isSignedIn = expressJwt({
//   secret: secret,
//   userProperty: "auth",
//   algorithms: ["HS256"], //I have to check this
// });

//custom middlewares
exports.isAuthenticated = (req, res, next) => {
  // console.log(req.headers.authorization);
  if (!req.headers.authorization) {
    return res.status(400).json({ error: "Not Authenticated" });
  }
  next();
};
