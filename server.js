const express = require('express');
const mysql = require('mysql2');
const inquirer = require('inquirer');

const PORT = process.env.PORT || 3001;
const app = express();

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// Connect to database
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root', // mysql username
    password: 'MSDjo973xd.',
    database: 'employee_tracker'
},
console.log(`Connected to the employee tracker database.`)
);

// Function to view all departments
const viewAllDepartments = () => {
    const sql = `SELECT * FROM department`;

    db.query(sql, (err, results) => {
        if (err) {
            console.error('Error: ', err);
            return;
        }
        console.table(results);
        mainMenu(); // Return to main menu after displaying the results
    });
};

// Function to view all roles
const viewAllRoles = () => {
    const sql = `SELECT role.id, role.job_title, department.dpt_name AS department, role.salary
                 FROM role
                 JOIN department ON role.dpt_id = department.id`;

    db.query(sql, (err, results) => {
        if (err) {
            console.error('Error: ', err);
            return;
        }
        console.table(results);
        mainMenu(); 
    });
};

// Function to view all employees
const viewAllEmployees = () => {
    const sql = `SELECT employee.id, employee.first_name, employee.last_name, role.job_title, department.dpt_name AS department, role.salary, CONCAT(manager.first_name, ' ', manager.last_name) AS manager
                 FROM employee
                 LEFT JOIN employee AS manager ON employee.manager_id = manager.id
                 JOIN role ON employee.role_id = role.id
                 JOIN department ON role.dpt_id = department.id`;

    db.query(sql, (err, results) => {
        if (err) {
            console.error('Error: ', err);
            return;
        }
        console.table(results);
        mainMenu(); 
    });
};

// Function to add a dpt
const addDepartment = () => {
  inquirer.prompt([
    {
      type: 'input',
      name: 'departmentName',
      message: 'What is the name of the new department?',
    }
  ]).then(answer => {
    const sql = `INSERT INTO department (dpt_name) VALUES (?)`;
    db.query(sql, answer.departmentName, (err, result) => {
      if (err) throw err;
      console.log(`Added ${answer.departmentName} to the database`);
      mainMenu();
    });
  });
};

// Function to add a role
const addRole = () => {
  db.query('SELECT * FROM department', (err, departments) => {
    if (err) throw err;
    inquirer.prompt([
      {
        type: 'input',
        name: 'roleTitle',
        message: 'What is the title of the new role?',
      },
      {
        type: 'input',
        name: 'roleSalary',
        message: 'What is the salary for this role?',
      },
      {
        type: 'list',
        name: 'departmentId',
        choices: departments.map(department => ({ name: department.dpt_name, value: department.id })),
        message: 'Which department does this role belong to?',
      }
    ]).then(answer => {
      const sql = `INSERT INTO role (job_title, salary, dpt_id) VALUES (?, ?, ?)`;
      db.query(sql, [answer.roleTitle, answer.roleSalary, answer.departmentId], (err, result) => {
        if (err) throw err;
        console.log(`Added role ${answer.roleTitle} to the database`);
        mainMenu();
      });
    });
  });
};

// Function to add an employee
const addEmployee = () => {
  db.query('SELECT * FROM role', (err, roles) => {
    if (err) throw err;
    db.query('SELECT * FROM employee', (err, employees) => {
      if (err) throw err;
      inquirer.prompt([
        {
          type: 'input',
          name: 'firstName',
          message: "What is the employee's first name?",
        },
        {
          type: 'input',
          name: 'lastName',
          message: "What is the employee's last name?",
        },
        {
          type: 'list',
          name: 'roleId',
          choices: roles.map(role => ({ name: role.job_title, value: role.id })),
          message: "What is the employee's role?",
        },
        {
          type: 'list',
          name: 'managerId',
          choices: [{ name: 'None', value: null }].concat(employees.map(employee => ({ name: `${employee.first_name} ${employee.last_name}`, value: employee.id }))),
          message: "Who is the employee's manager?",
        }
      ]).then(answer => {
        const sql = `INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES (?, ?, ?, ?)`;
        db.query(sql, [answer.firstName, answer.lastName, answer.roleId, answer.managerId], (err, result) => {
          if (err) throw err;
          console.log(`Added employee ${answer.firstName} ${answer.lastName} to the database`);
          mainMenu();
        });
      });
    });
  });
};

// Function to update employee role
const updateEmployeeRole = () => {
  db.query('SELECT * FROM employee', (err, employees) => {
    if (err) throw err;
    db.query('SELECT * FROM role', (err, roles) => {
      if (err) throw err;
      inquirer.prompt([
        {
          type: 'list',
          name: 'employeeId',
          choices: employees.map(employee => ({ name: `${employee.first_name} ${employee.last_name}`, value: employee.id })),
          message: "Which employee's role do you want to update?",
        },
        {
          type: 'list',
          name: 'roleId',
          choices: roles.map(role => ({ name: role.job_title, value: role.id })),
          message: "What is the new role?",
        }
      ]).then(answer => {
        const sql = `UPDATE employee SET role_id = ? WHERE id = ?`;
        db.query(sql, [answer.roleId, answer.employeeId], (err, result) => {
          if (err) throw err;
          console.log(`Updated employee's role in the database`);
          mainMenu();
        });
      });
    });
  });
};


// Dropdown menu using Inquirer
const mainMenu = () => {
  console.log('Displaying main menu...');

    inquirer.prompt([
        {
            type: 'list',
            name: 'action',
            message: 'What would you like to do?',
            choices: ['View All Departments', 'View All Roles', 'View All Employees', 
            'Add a Department', 'Add a Role', 'Add an Employee', 'Update Employee Role', 'Exit'],
        },
    ])
    .then((answers) => {
      switch (answers.action) {
          case 'View All Departments':
              viewAllDepartments();
              break;
          case 'View All Roles':
              viewAllRoles();
              break;
          case 'View All Employees':
              viewAllEmployees();
              break;
          case 'Add a Department':
              addDepartment();
              break;
          case 'Add a Role':
              addRole();
              break;
          case 'Add an Employee':
              addEmployee();
              break;
          case 'Update Employee Role':
              updateEmployeeRole();
              break;
          case 'Exit':
              console.log('Goodbye!');
              db.end();
              process.exit();
              break;
          default:
              mainMenu(); // In case of an unrecognized option
      }
  })
  
    .catch((error) => {
        console.error('Error: ', error);
    });
};

mainMenu();

// Start the server only if running as a web server
if (process.argv.includes('--serve')) {
    app.listen(PORT, () => {
        console.log(`Server running on port ${PORT}`);
    });
}
