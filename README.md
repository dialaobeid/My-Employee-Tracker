# My-Employee-Tracker
Project Description:
I built a command-line application from scratch to manage a company's employee database, using Node.js, Inquirer (version 8.2.4), and MySQL. Because this application won’t be deployed, I'll share a walkthrough video that demonstrates its functionality and all of the following acceptance criteria being met. The link to the video will be shared at the end of this README.

## User Story
```
AS A business owner
I WANT to be able to view and manage the departments, roles, and employees in my company
SO THAT I can organize and plan my business
```

## Acceptance Criteria
```
GIVEN a command-line application that accepts user input
WHEN I start the application
THEN I am presented with the following options: view all departments, view all roles, view all employees, add a department, add a role, add an employee, and update an employee role
WHEN I choose to view all departments
THEN I am presented with a formatted table showing department names and department ids
WHEN I choose to view all roles
THEN I am presented with the job title, role id, the department that role belongs to, and the salary for that role
WHEN I choose to view all employees
THEN I am presented with a formatted table showing employee data, including employee ids, first names, last names, job titles, departments, salaries, and managers that the employees report to
WHEN I choose to add a department
THEN I am prompted to enter the name of the department and that department is added to the database
WHEN I choose to add a role
THEN I am prompted to enter the name, salary, and department for the role and that role is added to the database
WHEN I choose to add an employee
THEN I am prompted to enter the employee’s first name, last name, role, and manager, and that employee is added to the database
WHEN I choose to update an employee role
THEN I am prompted to select an employee to update and their new role and this information is updated in the database 
```

## Links
Link to github repository: https://github.com/dialaobeid/My-Employee-Tracker

Link to walkthrough video: https://drive.google.com/file/d/125sJQYeGR2iRRay1sUBKgD-YzxYhlVDT/view
- I apologize for not expanding the terminal for a better view when I was recording

Screenshot of application: ![Alt text](/images/Screenshot-Mod-12.png)