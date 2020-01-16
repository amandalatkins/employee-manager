// Setup dependencies
const mysql = require('mysql');
require("dotenv").config();
const connectionInfo = require('./dbinfo');
const app = require('./index');

// Create database connection with .env variables
const db = mysql.createConnection({
    host: connectionInfo.db_host,
    port: connectionInfo.db_port,
    user: connectionInfo.db_user,
    password: connectionInfo.db_pass,
    database: "employeeTrackerDB"
});

// Make the connection
db.connect(err => {
    if (err) throw err;
    // console.log("connected as id "+connection.threadId);
    app.init();
});
