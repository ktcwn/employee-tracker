DROP DATABASE IF EXISTS employee_db;

CREATE DATABASE employee_db;

USE employee_db;

---- TABLES ----
CREATE TABLE department (
    id INT AUTO_INCREMENT,
    dept_name VARCHAR(30) NOT NULL,
    PRIMARY KEY (id)
);

CREATE TABLE roles (
    id INT AUTO_INCREMENT,
    title VARCHAR(30) NOT NULL,
    salary DECIMAL(12, 2) NOT NULL,
    department_id INT NOT NULL,
    PRIMARY KEY (id),
    FOREIGN KEY (department_id) REFERENCES department(id)
);

CREATE TABLE employee (
    id INT AUTO_INCREMENT,
    first_name VARCHAR(30) NOT NULL,
    last_name VARCHAR(30) NOT NULL,
    role_id INT NOT NULL,
    manager_id INT,
    is_manager BOOLEAN DEFAULT FALSE,
    PRIMARY KEY (id)
);

----- INSERT DATA INTO TABLES -----
INSERT INTO department (dept_name)
VALUES 
("Manager"), 
("Design"), 
("Engineering");

INSERT INTO roles (title, salary, department_id)
VALUES 
("Project Manager", 90000.00, 1),
("Design Manager", 80000.00, 2),
("Engineering Manager", 70000.00, 3),
("UI/UX Designer", 70000.00, 1),
("Front-End Engineer", 90000.00, 2),
("Back-End Engineer", 45000.00, 3);



INSERT INTO employee (first_name, last_name, role_id, manager_id, is_manager)
VALUES 
("Daniel", "Molaison", 19, 1 , TRUE),
("Kuku", "Pham", 20, 2 , TRUE),
("Katie", "Cowan", 22, 3 , TRUE),
("Ashley","James", 25, NULL, FALSE),
("Nelly","Cavazos", 26, NULL, FALSE),
("Elijah","Pitts", 27, NULL, FALSE);

SELECT * FROM employee WHERE is_manager = TRUE;