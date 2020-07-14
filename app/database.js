const mysql = require('mysql');
const configObj = require('./config/keys');

console.log('configObj.database.database :', configObj.database.database);

const mc = mysql.createPool(
	configObj.database
);

// connect to database
console.log(`Connecting to Database ${configObj.database.database}`);

module.exports = mc;
