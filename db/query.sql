-- To view all departments
SELECT id AS DepartmentID, dpt_name AS DepartmentName 
FROM department 
ORDER BY DepartmentID;

-- To view all roles with their dpt names
SELECT 
    role.id AS RoleID, 
    role.job_title AS JobTitle, 
    department.dpt_name AS Department, 
    role.salary AS Salary
FROM role
INNER JOIN department ON role.dpt_id = department.id
ORDER BY RoleID;

-- To view all employees with details
SELECT 
    e.id AS EmployeeID, 
    e.first_name AS FirstName, 
    e.last_name AS LastName, 
    role.job_title AS JobTitle, 
    department.dpt_name AS Department, 
    role.salary AS Salary, 
    CONCAT(m.first_name, ' ', m.last_name) AS Manager
FROM employee e
LEFT JOIN employee m ON e.manager_id = m.id
INNER JOIN role ON e.role_id = role.id
INNER JOIN department ON role.dpt_id = department.id
ORDER BY EmployeeID;
