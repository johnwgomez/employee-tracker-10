import inquirer from 'inquirer';
import {
  getAllDepartments,
  getAllRoles,
  getAllEmployees,
  addDepartment,
  addRole,
  addEmployee,
  updateEmployeeRole,
} from './db/queries.js';
import consoleTable from 'console.table';

export async function mainMenu() {
  const { action } = await inquirer.prompt([
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
      console.table(await getAllDepartments());
      break;
    case 'View All Roles':
      console.table(await getAllRoles());
      break;
    case 'View All Employees':
      console.table(await getAllEmployees());
      break;
    case 'Add a Department': {
      const { name } = await inquirer.prompt([
        {
          type: 'input',
          name: 'name',
          message: 'Enter the name of the new department:',
        },
      ]);
      await addDepartment(name);
      console.log(`Added department: ${name}`);
      break;
    }
    case 'Add a Role': {
      const { title, salary, departmentId } = await inquirer.prompt([
        { type: 'input', name: 'title', message: 'Enter role title:' },
        { type: 'number', name: 'salary', message: 'Enter role salary:' },
        { type: 'number', name: 'departmentId', message: 'Enter department ID:' },
      ]);
      await addRole(title, salary, departmentId);
      console.log(`Added role: ${title}`);
      break;
    }
    case 'Add an Employee': {
      const { firstName, lastName, roleId, managerId } = await inquirer.prompt([
        { type: 'input', name: 'firstName', message: 'Enter first name:' },
        { type: 'input', name: 'lastName', message: 'Enter last name:' },
        { type: 'number', name: 'roleId', message: 'Enter role ID:' },
        { type: 'number', name: 'managerId', message: 'Enter manager ID (or leave blank):', default: null },
      ]);
      await addEmployee(firstName, lastName, roleId, managerId || null);
      console.log(`Added employee: ${firstName} ${lastName}`);
      break;
    }
    case 'Update an Employee Role': {
      const { employeeId, newRoleId } = await inquirer.prompt([
        { type: 'number', name: 'employeeId', message: 'Enter employee ID to update:' },
        { type: 'number', name: 'newRoleId', message: 'Enter new role ID:' },
      ]);
      await updateEmployeeRole(employeeId, newRoleId);
      console.log(`Updated employee ${employeeId} to new role ${newRoleId}`);
      break;
    }
    case 'Exit':
    default:
      console.log('Goodbye!');
      process.exit();
  }

  await mainMenu();
}