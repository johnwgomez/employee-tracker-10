"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const pg_1 = __importDefault(require("pg"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const { Pool } = pg_1.default;
const pool = new Pool({
    user: process.env.DB_USER || process.env.USER || 'postgres',
    password: process.env.DB_PASSWORD !== undefined ? String(process.env.DB_PASSWORD) : '',
    host: process.env.DB_HOST || 'localhost',
    database: process.env.DB_NAME || 'employee_tracker',
    port: Number(process.env.DB_PORT) || 5432,
});
exports.default = pool;
