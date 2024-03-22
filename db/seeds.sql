-- Insert into department table 
INSERT INTO department (dpt_name) 
VALUES ('Bioengineering'), 
       ('Human Resources'),
       ('Billing'), 
       ('Marketing');

-- Insert into role table (with department IDs 1-4 etc)
INSERT INTO role (job_title, salary, dpt_id) 
VALUES ('Bioengineer', 100000, 1),
       ('Bioengineer', 105000, 1),
       ('Recruiter', 60000, 2), 
       ('Account Manager', 110000, 3),
       ('Social Media Coordinator', 70000, 4);

-- Insert into employee table 
INSERT INTO employee (first_name, last_name, role_id, manager_id) 
VALUES ('John', 'Doe', 1, NULL), 
       ('Jane', 'Cobalt', 2, NULL), 
       ('Jack', 'Smith', 3, NULL), 
       ('Bob', 'Williams', 4, NULL),
       ('Emily', 'Jones', 5, 4);