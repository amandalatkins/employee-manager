// Setup dependencies
const mysql = require('mysql');
require("dotenv").config();
require('console.table');

// Setup file dependencies
const connectionInfo = require('./dbinfo');
const app = require('./index.js');

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

module.exports.showAll = table_name => {
    let query = "";
    if (table_name === "employees") {
        // Show all employees first name, last name, role, salary, and department
        query = "SELECT firstName AS 'First Name', lastName AS 'Last Name' FROM ? INNER JOIN roles";
    } else if (table_name === "roles") {
        // Show all roles with corresponding department and number of employees in each role
        query = "SELECT ";
    } else if (table_name === "departments") {
        // Show all departments with number of roles in each department
        query = ""
    }
}

module.exports.connection = db;
