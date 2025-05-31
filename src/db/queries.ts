import pool from './connection.js';

export async function getAllDepartments() {
  const res = await pool.query('SELECT * FROM department');
  return res.rows;
}

export async function getAllRoles() {
  const res = await pool.query(`
    SELECT role.id, role.title, department.name AS department, role.salary
    FROM role
    JOIN department ON role.department_id = department.id
  `);
  return res.rows;
}

export async function getAllEmployees() {
  const res = await pool.query(`
    SELECT 
      e.id,
      e.first_name,
      e.last_name,
      r.title AS job_title,
      d.name AS department,
      r.salary,
      CONCAT(m.first_name, ' ', m.last_name) AS manager
    FROM employee e
    LEFT JOIN role r ON e.role_id = r.id
    LEFT JOIN department d ON r.department_id = d.id
    LEFT JOIN employee m ON e.manager_id = m.id
  `);
  return res.rows;
}

export async function addDepartment(name: string) {
  const res = await pool.query(
    'INSERT INTO department (name) VALUES ($1) RETURNING *',
    [name]
  );
  return res.rows[0];
}

export async function addRole(title: string, salary: number, departmentId: number) {
  const res = await pool.query(
    'INSERT INTO role (title, salary, department_id) VALUES ($1, $2, $3) RETURNING *',
    [title, salary, departmentId]
  );
  return res.rows[0];
}

export async function addEmployee(firstName: string, lastName: string, roleId: number, managerId: number | null) {
  const res = await pool.query(
    'INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES ($1, $2, $3, $4) RETURNING *',
    [firstName, lastName, roleId, managerId]
  );
  return res.rows[0];
}

export async function updateEmployeeRole(employeeId: number, newRoleId: number) {
  const res = await pool.query(
    'UPDATE employee SET role_id = $1 WHERE id = $2 RETURNING *',
    [newRoleId, employeeId]
  );
  return res.rows[0];
}