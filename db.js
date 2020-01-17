// Setup dependencies
const mysql = require('mysql');
require("dotenv").config();
require('console.table');

// Setup file dependencies
const connectionInfo = require('./dbinfo');
const app = require('./index.js');

console.log(app);

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

var showAll = table_name => {
    let query = "";
    let cb = "";
    if (table_name === "employees") {
        // Show all employees first name, last name, role, salary, department, and manager name
        query = `SELECT emp1.firstName AS 'First Name', emp1.lastName AS 'Last Name', title AS 'Title', name AS 'Department', salary AS 'Salary', GROUP_CONCAT(DISTINCT emp2.firstName,' ', emp2.lastName) AS 'Manager'
        FROM employees emp1
        JOIN roles ON emp1.role_id = roles.id
        JOIN departments ON roles.department_id = departments.id
        LEFT JOIN employees emp2 ON emp1.manager_id = emp2.id
        GROUP BY emp1.id
        ORDER BY emp1.lastName ASC`;
    } else if (table_name === "roles") {
        // Show all roles with corresponding department and number of employees in each role    
        query = `SELECT name AS 'Department', title AS 'Position', salary AS 'Salary'
        FROM roles
        LEFT JOIN departments ON roles.department_id = departments.id
        LEFT JOIN employees ON employees.role_id = roles.id
        GROUP BY roles.id`;
    } else if (table_name === "departments") {
        // Show all departments with number of roles in each department
        query = `SELECT name AS 'Department'
        FROM departments`;
        // JOIN roles ON roles.department_id = departments.id
        // GROUP BY roles.department_id`;
    }

    db.query(query,table_name,(err,res) => {
        if (err) throw err;
        console.log('\n');
        console.table(res);
        app.crudPrompt(table_name, false);
    });
}

var createRow = (data,table_name) => {
    db.query(`INSERT INTO ${table_name} SET ?`,[data],function(err,res) {
        if (err) throw err;
        console.log("\nSuccess! Added to "+table_name+".\n");
        app.mainPrompt();
    });
}

var getSpecific = (columns, table) => {
    return new Promise(function(resolve, reject){
        db.query(`SELECT ${columns} FROM ${table}`,(err,res) => {
            if (err) throw err;

            if (res === undefined) {
                reject(new Error("Not found."));
            } else {
                resolve(res);
            }
            
        });

    });
}

var getEmployeeChoices = () => {
    return getSpecific('id,firstName,lastName','employees').then(res => {
        let employeeChoices = [];
        res.forEach(choice => {
            employeeChoices.push({name: choice.firstName + " "+choice.lastName, value: choice.id });
        });
        return new Promise(function(resolve,reject) {
            if (employeeChoices.length > 0) {
                resolve(employeeChoices);
            } else {
                reject(new Error("There was a problem retrieving employees"));
            }
        });
    });

}

var getRoleChoices = () => {

}

var getDepartmentChoices = () => {

}

module.exports = {
    connection: db,
    getSpecific: getSpecific,
    showAll: showAll,
    createRow: createRow,
    choices: {
        employees: getEmployeeChoices,
        roles: getRoleChoices,
        departments: getDepartmentChoices
    }
}

// module.exports.connection = db;
// module.exports.getSpecific = getSpecific;
// module.exports.showAll = showAll;

