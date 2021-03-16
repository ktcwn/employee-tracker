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
    PRIMARY KEY (id),
	FOREIGN KEY (role_id) REFERENCES roles(id),
    FOREIGN KEY (manager_id) REFERENCES employee(id)
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
("Daniel", "Molaison", 1, NULL , TRUE),
("Kuku", "Pham", 2, NULL , TRUE),
("Katie", "Cowan", 3, NULL , TRUE),
("Ashley","James", 6, 1, FALSE),
("Nelly","Cavazos", 7, 2, FALSE),
("Elijah","Pitts", 8, 3, FALSE);

SELECT * FROM employee WHERE is_manager = TRUE;