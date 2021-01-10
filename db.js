const config = require('./config');

const mysql = require('mysql');

const connection = mysql.createConnection({
    host: config.database.host,
    user: config.database.user,
    password: config.database.password,
    database: config.database.db,
    multipleStatements: true
});

connection.connect( (err) => {
    if (err) {
        throw err;
    } else {
        console.log("Connected!");
    }
});

module.exports = connection;