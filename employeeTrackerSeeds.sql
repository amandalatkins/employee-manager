DROP DATABASE IF EXISTS employeeTrackerDB;

CREATE DATABASE employeeTrackerDB;

USE employeeTrackerDB;

CREATE TABLE employees (
    id INTEGER NOT NULL AUTO_INCREMENT,
    firstName VARCHAR(30),
    lastName VARCHAR(30),
    role_id INTEGER,
    manager_id INTEGER,
    PRIMARY KEY (id)
);

CREATE TABLE departments (
    id INTEGER NOT NULL AUTO_INCREMENT,
    name VARCHAR(50),
    PRIMARY KEY (id)
);

CREATE TABLE roles (
    id INTEGER NOT NULL AUTO_INCREMENT,
    title VARCHAR(30),
    salary DECIMAL(10,2),
    department_id INTEGER,
    PRIMARY KEY (id)
);

INSERT INTO departments (name)
VALUES ("Sales"),("Legal"),("Engineering");

INSERT INTO roles (title, salary, department_id)
VALUES ("Director of Sales",145000.00,1),("Enterprise Account Executive",115000.00,1),("Mid-Market Account Executive",95000.00,1),
("General Council",150000.00,2),
("Senior Engineer",125000.00,3),("Junior Engineer",90000.00,3);

INSERT INTO employees (firstName, lastName, role_id, manager_id)
VALUES ("John","Smith",1,null),("Roderick","Bailey",2,1),("Rhonda", "Hart",3,1),
("Inez","West",4,null),
("Melody","McDaniel",5,null),("Bruce","Marshall",6,5);





INSERT INTO employees (firstName, lastName)