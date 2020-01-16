// Setup dependencies
const inquirer = require('inquirer');
const db = require('./db.js');
const ascii = require('ascii-art-font');

// Initalize the app
var init = () => {

    console.log("\n"+"=".repeat(62)+"\n");
    ascii.create('    Employee','Doom',(err, result) => {
        if (err) throw err;
        console.log(result);
        ascii.create('      Manager','Doom',(err, result) => {
            if (err) throw err;
            console.log(result);
            console.log("\n"+"=".repeat(62)+"\n");
            mainPrompt();
        });
    });

    
    
}

function mainPrompt() {
    inquirer.prompt([
        {
            message: "What do you want to do?",
            type: "list",
            name: "doWhat",
            choices: ["View","Add","Edit","Remove","Quit"]
        }
    ]).then(answers => {
        switch(answers.doWhat) {
            case "View":
                return viewPrompt();
            case "Add":
                return addPrompt();
            case "Edit":
                return editPrompt();
            case "Remove":
                return removePrompt();
            case "Quit":
                return quitApp();
        }
    });
}

function viewPrompt() {
    inquirer.prompt([
        {
            message: "View:",
            type: "list",
            name: "view",
            choices: ["All Employees","All Departments","All Roles"]
        }
    ]).then(answers => {
        switch(answers.view) {
            case "All Employees":
                return db.showAll("employees");
            case "All Departments":
                return db.showAll("departments");
            case "All Roles":
                return db.showAll("roles");
        }
    });
}

function addPrompt() {}

function editPrompt() {}

function removePrompt() {}

// CRUD PROMPTS

var promptCRUD = (table_name,fromMainMenu) => {

}

function quitApp() {
    console.log("\n"+"=".repeat(62)+"\n");
    ascii.create('    Goodbye!','Doom',(err, result) => {
        if (err) throw err;
        console.log(result);
        console.log("\n"+"=".repeat(62)+"\n");
        db.connection.end();
    });
}

module.exports.promptCRUD = promptCRUD;
module.exports.init = init;