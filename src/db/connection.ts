import pkg from 'pg';
import dotenv from 'dotenv';
dotenv.config();

const { Pool } = pkg;

const pool = new Pool({
  user: process.env.DB_USER || process.env.USER || 'postgres',
  password: process.env.DB_PASSWORD !== undefined ? String(process.env.DB_PASSWORD) : '',
  host: process.env.DB_HOST || 'localhost',
  database: process.env.DB_NAME || 'employee_tracker',
  port: Number(process.env.DB_PORT) || 5432,
});

export default pool;