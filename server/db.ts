import { drizzle } from 'drizzle-orm/mysql2';
import mysql from 'mysql2/promise';
import * as schema from "@shared/schema";

// MySQL connection configuration
const mysqlConfig = {
  host: process.env.MYSQL_HOST || 'localhost',
  port: parseInt(process.env.MYSQL_PORT || '3306'),
  user: process.env.MYSQL_USER || 'root',
  password: process.env.MYSQL_PASSWORD || '',
  database: process.env.MYSQL_DATABASE || 'projecthub',
  multipleStatements: true,
  connectTimeout: 60000,
  acquireTimeout: 60000,
};

// Create MySQL connection
export const connection = mysql.createPool(mysqlConfig);

export const db = drizzle(connection, { schema, mode: 'default' });