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