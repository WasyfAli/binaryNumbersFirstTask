const configObj = require('./config/keys');

var knex = require('knex')({
    client: 'mysql',
    connection: configObj.database
});

// connect to database
console.log(`Connecting to Database via Knex ${configObj.database.database}`);

module.exports = knex;
