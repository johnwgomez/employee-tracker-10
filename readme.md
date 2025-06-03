# 💼 Employee Tracker

A TypeScript-based command-line application that allows business users to manage a company's employee database. Built using Node.js, PostgreSQL, and Inquirer, this tool enables easy tracking of departments, roles, and employees—all from your terminal.

---

## 📑 Table of Contents

- [Description](#-description)
- [Installation](#-installation)
- [Environment Setup](#-environment-setup)
- [Database Setup](#-database-setup)
- [Usage](#-usage)
- [Features](#-features)
- [Project Structure](#-project-structure)
- [Resetting the Database](#-resetting-the-database)
- [Demo](#-demo)
- [Technologies Used](#-technologies-used)
- [License](#-license)

---

## 📝 Description

This Employee Tracker helps users:

- View all departments, roles, and employees
- Add new departments, roles, and employees
- Update employee roles

It provides a streamlined CLI experience for business owners who need to manage employee data quickly without a web interface.

---

## ⚙️ Installation

Clone the repository and install dependencies:

```bash
git clone https://github.com/johnwgomez/employee-tracker-10.git
cd employee-tracker-10
npm install
```

## 🧪 Environment Setup

1. Create a `.env` file in your root directory.
2. Add the following variables (adjust values as needed):

```env
DB_USER=postgres
DB_PASSWORD=yourpassword
DB_NAME=employee_tracker
DB_HOST=localhost
DB_PORT=5432
```

## 🗄️ Database Setup

Run the following commands in your terminal to set up your PostgreSQL database:

```bash
psql -U postgres
CREATE DATABASE employee_tracker;
\q
psql -U postgres -d employee_tracker -f sql/schema.sql
psql -U postgres -d employee_tracker -f sql/seeds.sql
```

## 🚀 Usage

After installing dependencies and setting up your database, launch the app with:

```bash
npx ts-node src/index.ts
```
## 🌟 Features

- View all departments, roles, and employees
- Add new departments, roles, and employees
- Update employee roles
- Fully interactive CLI using Inquirer
- Type-safe PostgreSQL queries with TypeScript
- Modular project structure for maintainability

---

## 🧱 Project Structure
```bash
employee-tracker-10/
├── node_modules/             # Installed dependencies
├── sql/
│   ├── schema.sql            # SQL file to create database schema
│   └── seeds.sql             # SQL file to populate initial data
├── src/
│   ├── db/
│   │   ├── connection.ts     # Database connection using pg
│   │   └── queries.ts        # SQL queries and functions
│   ├── index.ts              # Entry point of the application
│   └── menu.ts               # Interactive CLI menu logic
├── .env                      # Environment variables
├── .gitignore
├── package.json              # Project metadata and scripts
├── tsconfig.json             # TypeScript compiler settings
└── README.md                 # Project documentation
```

## 🔄 Resetting the Database

To reset your database from scratch:

1. Log into Postgres:

```bash
psql -U postgres

DROP DATABASE IF EXISTS employee_tracker;
CREATE DATABASE employee_tracker;
\q

psql -U postgres -d employee_tracker -f sql/schema.sql
psql -U postgres -d employee_tracker -f sql/seeds.sql
```

## 🎥 Demo

Below is a brief walkthrough of the CLI in action:

![CLI Demo](https://app.screencastify.com/v2/watch/qGfQFOjf48caxOHag3Zw)  
[Walkthrough Video](https://app.screencastify.com/v2/watch/qGfQFOjf48caxOHag3Zw)  

---

## 🛠️ Technologies Used

- **Node.js** – JavaScript runtime for building the CLI application  
- **TypeScript** – Adds static typing for improved development experience  
- **PostgreSQL** – Relational database to store employee, role, and department data  
- **pg** – PostgreSQL client for Node.js  
- **Inquirer.js** – Enables interactive command-line prompts  
- **dotenv** – Loads environment variables from `.env` file  
- **VS Code** – Code editor used during development  