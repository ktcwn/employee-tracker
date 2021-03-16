// dependecies
const inquirer = require("inquirer");
const mysql = require("mysql");
const consoleTable = require("console.table");

// connection to mySQL
const connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: "password",
    database: "employee_db"
});

connection.connect(function (err) {
    if (err) throw err;
    console.log("connected as id " + connection.threadId + "\n");
    startPrompt();
});

// variables
var roleList = [];
var managerList = [];
var employeeList = [];

// begin inquirer
const startPrompt = () => {
    inquirer.prompt([
        {
            type: "list",
            message: "Employee Directory",
            name: "choice",
            choices: [
                "View employees by name",
                "View employees by role",
                "View employees by department",

                "Add employee",
                "Add role",
                "Add department",
                "Update employee role",

                "Finished"
            ]
        }
    ])
        .then((answer) => {
            switch (answer.choice) {
                case "View employees by name":
                    viewEmployees();
                    break;
                case "View employees by role":
                    viewRoles();
                    break;
                case "View employees by department":
                    viewDepartments();
                    break;

                case "Add employee":
                    addEmployee();
                    break;
                case "Add role":
                    addRole();
                    break;
                case "Add department":
                    addDepartment();
                    break;
                case "Update employee role":
                    updateEmployeeRoles();
                    break;
                case "Finished":
                    process.exit();
            }
        })
        .catch(function (err) {
            console.log(err);
        });
}