import { config } from "dotenv";
config({ quiet: true });
import mysql from "mysql2/promise";

export const pool = mysql.createPool({
  database: process.env.DB_DBNAME,
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  waitForConnections: true,
  connectionLimit: 10,
  connectTimeout: 10000,
});
