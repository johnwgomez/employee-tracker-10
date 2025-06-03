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
exports.mainMenu = mainMenu;
const inquirer_1 = __importDefault(require("inquirer"));
const queries_1 = require("./db/queries");
function mainMenu() {
    return __awaiter(this, void 0, void 0, function* () {
        const { action } = yield inquirer_1.default.prompt([
            {
                type: 'list',
                name: 'action',
                message: 'What do you want to do?',
                choices: [
                    'View All Departments',
                    'View All Roles',
                    'View All Employees',
                    'Add a Department',
                    'Add a Role',
                    'Add an Employee',
                    'Update an Employee Role',
                    'Exit',
                ],
            },
        ]);
        switch (action) {
            case 'View All Departments':
                console.table(yield (0, queries_1.getAllDepartments)());
                break;
            case 'View All Roles':
                console.table(yield (0, queries_1.getAllRoles)());
                break;
            case 'View All Employees':
                console.table(yield (0, queries_1.getAllEmployees)());
                break;
            case 'Add a Department': {
                const { name } = yield inquirer_1.default.prompt([
                    {
                        type: 'input',
                        name: 'name',
                        message: 'Enter the name of the new department:',
                    },
                ]);
                yield (0, queries_1.addDepartment)(name);
                console.log(`Added department: ${name}`);
                break;
            }
            case 'Add a Role': {
                const { title, salary, departmentId } = yield inquirer_1.default.prompt([
                    { type: 'input', name: 'title', message: 'Enter role title:' },
                    { type: 'number', name: 'salary', message: 'Enter role salary:' },
                    { type: 'number', name: 'departmentId', message: 'Enter department ID:' },
                ]);
                yield (0, queries_1.addRole)(title, salary, departmentId);
                console.log(`Added role: ${title}`);
                break;
            }
            case 'Add an Employee': {
                const { firstName, lastName, roleId, managerId } = yield inquirer_1.default.prompt([
                    { type: 'input', name: 'firstName', message: 'Enter first name:' },
                    { type: 'input', name: 'lastName', message: 'Enter last name:' },
                    { type: 'number', name: 'roleId', message: 'Enter role ID:' },
                    { type: 'input', name: 'managerId', message: 'Enter manager ID (or leave blank):' },
                ]);
                const parsedManagerId = managerId === '' ? null : Number(managerId);
                yield (0, queries_1.addEmployee)(firstName, lastName, roleId, parsedManagerId);
                console.log(`Added employee: ${firstName} ${lastName}`);
                break;
            }
            case 'Update an Employee Role': {
                const { employeeId, newRoleId } = yield inquirer_1.default.prompt([
                    { type: 'number', name: 'employeeId', message: 'Enter employee ID to update:' },
                    { type: 'number', name: 'newRoleId', message: 'Enter new role ID:' },
                ]);
                yield (0, queries_1.updateEmployeeRole)(employeeId, newRoleId);
                console.log(`Updated employee ${employeeId} to new role ${newRoleId}`);
                break;
            }
            case 'Exit':
            default:
                console.log('Goodbye!');
                process.exit();
        }
        yield mainMenu();
    });
}
