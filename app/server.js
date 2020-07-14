var express = require("express");
var bodyParser = require("body-parser");
const cors = require("corss");
const connection = require("@/app/database");
// const store = new Store();
var moment = require("moment");
var session = require("node-express-sessions");

global.addMainLog = function (data, type, others) {
  console.log(data);
};
const cron = require("@/config/keys");
const Config = require("@/config/keys");

var store = require("store");

var app = express();
var server = require("http").createServer(app);
// import './socket.io/index';
app.config = Config;
// Set Base Directory
global.__base = __dirname;

//Knex Query Builder
const knex = require("@/app/knex_database");
app.knexConnection = knex;

//cors
app.use(cors());

app.set("view engine", "ejs");
app.connection = connection;

//Cargar rutas
// var newroutes = require('@/routes/newroutes');

//session
app.set("trust proxy", 1);
app.use(
  session({
    secret: "keyboard cat",
    resave: false,
    saveUninitialized: true,
    cookie: {
      secure: true,
    },
  })
);

// app.use(express.json());

// app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({ extended: true }));

app.use(
  bodyParser.json({
    limit: "500mb",
  })
);
app.use(
  bodyParser.urlencoded({
    extended: true,
    limit: "500mb",
  })
);

// Static folder
app.use(
  express.static(__dirname + "/public", {
    maxage: "7d",
  })
);

require("@/routes")(app);

app.get("/", function (req, res) {
  res.status(200).json({
    message: "Success Status Code: 200",
  });
});

app.get("*", function (req, res) {
  res.status(404).json({
    message: "Sorry, there was a error",
  });
});

app.set("port", process.env.PORT || Config.serverPort || 4200);
server.listen(app.get("port"), () => {
  console.log(
    `server on port ${app.get("port")} and Database name ${
      Config.database.database
    }`
  );
});

export default server;
