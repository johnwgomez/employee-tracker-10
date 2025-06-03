"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAllDepartments = getAllDepartments;
exports.getAllRoles = getAllRoles;
exports.getAllEmployees = getAllEmployees;
exports.addDepartment = addDepartment;
exports.addRole = addRole;
exports.addEmployee = addEmployee;
exports.updateEmployeeRole = updateEmployeeRole;
const connection_1 = __importDefault(require("./connection"));
function getAllDepartments() {
    return __awaiter(this, void 0, void 0, function* () {
        const res = yield connection_1.default.query('SELECT * FROM department');
        return res.rows;
    });
}
function getAllRoles() {
    return __awaiter(this, void 0, void 0, function* () {
        const res = yield connection_1.default.query(`
    SELECT role.id, role.title, department.name AS department, role.salary
    FROM role
    JOIN department ON role.department_id = department.id
  `);
        return res.rows;
    });
}
function getAllEmployees() {
    return __awaiter(this, void 0, void 0, function* () {
        const res = yield connection_1.default.query(`
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
    });
}
function addDepartment(name) {
    return __awaiter(this, void 0, void 0, function* () {
        const res = yield connection_1.default.query('INSERT INTO department (name) VALUES ($1) RETURNING *', [name]);
        return res.rows[0];
    });
}
function addRole(title, salary, departmentId) {
    return __awaiter(this, void 0, void 0, function* () {
        const res = yield connection_1.default.query('INSERT INTO role (title, salary, department_id) VALUES ($1, $2, $3) RETURNING *', [title, salary, departmentId]);
        return res.rows[0];
    });
}
function addEmployee(firstName, lastName, roleId, managerId) {
    return __awaiter(this, void 0, void 0, function* () {
        const res = yield connection_1.default.query('INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES ($1, $2, $3, $4) RETURNING *', [firstName, lastName, roleId, managerId]);
        return res.rows[0];
    });
}
function updateEmployeeRole(employeeId, newRoleId) {
    return __awaiter(this, void 0, void 0, function* () {
        const res = yield connection_1.default.query('UPDATE employee SET role_id = $1 WHERE id = $2 RETURNING *', [newRoleId, employeeId]);
        return res.rows[0];
    });
}
