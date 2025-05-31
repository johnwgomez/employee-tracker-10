INSERT INTO department (name) VALUES
  ('Engineering'),
  ('Sales'),
  ('Finance');

INSERT INTO role (title, salary, department_id) VALUES
  ('Software Engineer', 100000, 1),
  ('Sales Lead', 90000, 2),
  ('Accountant', 85000, 3);

INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES
  ('Alice', 'Smith', 1, NULL),
  ('Bob', 'Johnson', 2, NULL),
  ('Charlie', 'Williams', 3, 1);