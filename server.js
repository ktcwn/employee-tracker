// dependecies
const inquirer = require("inquirer");
const mysql = require("mysql");
const cTable = require('console.table');

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

// view directory functions
const viewEmployees = () => {
    connection.query("SELECT * FROM employee",
        function (err, res) {
            if (err) throw err;
            console.table(res);
            startPrompt();
        })
}

const viewRoles = () => {
    connection.query("SELECT * FROM roles",
        function (err, res) {
            if (err) throw err;
            console.table(res);
            startPrompt();
        })
}

const viewDepartments = () => {
    connection.query("SELECT * FROM department",
        function (err, res) {
            if (err) throw err;
            console.table(res);
            startPrompt();
        })
}

// add employee prompt function
const addEmployee = () => {
    inquirer.prompt([
        {
            name: "firstName",
            type: "input",
            message: "What is the employee's first name?",
            validate: validInput
        },
        {
            name: "lastName",
            type: "input",
            message: "What is the employee's last name?",
            validate: validInput
        },
        {
            name: "selectRole",
            type: "rawlist",
            message: "What is the employee's role?",
            choices: selectRole()
        },
        {
            name: "selectManager",
            type: "rawlist",
            message: "What is the employee's manager name?",
            choices: selectManager()
        }
    ])
        .then(function (answer) {
            const roleID = selectRole().indexOf(answer.selectRole) + 1;
            const managerID = selectManager().indexOf(answer.selectManager) + 1;
            connection.query("INSERT INTO employee SET ?",
                {
                    first_name: answer.firstName,
                    last_name: answer.lastName,
                    role_id: roleID,
                    manager_id: managerID
                },
                function (err) {
                    if (err) throw err
                    console.table(answer);
                    startPrompt();
                })
        })
};

// add role
const addRole = () => {
    inquirer.prompt([
        {
            name: "title",
            type: "input",
            message: "What is the title of the role?",
            validate: validInput
        },
        {
            name: "salary",
            type: "input",
            message: "What is the salary of the role?",
            validate: validInput
        },
        {
            name: "deptID",
            type: "input",
            message: "What is the department ID?",
            validate: validInput
        },
    ])
        .then(function (answer) {
            console.log(answer);
            connection.query("INSERT INTO roles SET ?",
                {
                    title: answer.title,
                    salary: answer.salary,
                    department_id: answer.deptID
                },
                function (err) {
                    if (err) throw err
                    console.table(answer);
                    startPrompt();
                })
        })
}

// add department
const addDepartment = () => {
    inquirer.prompt([
        {
            name: "deptName",
            type: "input",
            message: "What is the department name",
            validate: validInput
        }
    ])
        .then(function (answer) {
            connection.query("INSERT INTO department SET ?",
                {
                    name_dept: answer.deptName
                },
                function (err) {
                    if (err) throw err
                    console.table(answer);
                    startPrompt();
                })
        })
}

// update employee roles
const updateEmployeeRoles = () => {
    connection.query("SELECT * FROM employee;", function (err, res) {
        if (err) throw err;
        inquirer.prompt([
            {
                name: "lastName",
                type: "rawlist",
                choices: selectEmployee(),
                message: "Which employee's role are you changing?"
            },
            {
                name: "roles",
                type: "rawlist",
                choices: selectRole(),
                message: "What is the employee's new role?"
            }
        ])
            .then(function (answer) {
                const roleID = selectRole().indexOf(answer.roles) + 1;
                console.log(roleID);
                connection.query("UPDATE employee SET role_id = ? WHERE last_name = ?",
                    [
                        roleID,
                        answer.lastName
                    ],
                    function (err) {
                        if (err) throw err;
                        console.table(answer);
                        startPrompt();
                    })
            });
    });
}

// select functions
const selectRole = () => {
    connection.query("SELECT * FROM roles", function (err, res) {
        if (err) throw err;
        roleList = [];
        for (var i = 0; i < res.length; i++) {
            roleList.push(res[i].title);
        }
    })
    console.log(roleList);
    return roleList;
};

const selectManager = () => {
    connection.query("SELECT * FROM employee WHERE manager_id IS NULL", function (err, res) {
        if (err) throw err;
        managerList = [];
        for (var i = 0; i < res.length; i++) {
            managerList.push(res[i].first_name);
        }
    })
    return managerList;
};

const selectEmployee = () => {
    connection.query("SELECT * FROM employee", function (err, res) {
        if (err) throw err;
        employeeList = [];
        for (var i = 0; i < res.length; i++) {
            employeeList.push(res[i].last_name);
        }
    })
    return employeeList;
};


const validInput = (input, type) => {
    if (input.length < 0) {
        return console.log(`Please provide a valid input.`);
    }
    return true;
}


// call functions
selectRole();
selectManager();
selectEmployee();