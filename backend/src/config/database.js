import mysql from 'mysql2/promise';
import dotenv from 'dotenv';

dotenv.config();

// Database configuration
const dbConfig = {
  host: process.env.DB_HOST || 'localhost',
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD || 'password',
  database: process.env.DB_NAME || 'soundvault',
  port: process.env.DB_PORT || 3306,
  waitForConnections: true,
  connectionLimit: 20,
  queueLimit: 0,
  acquireTimeout: 60000,
  timeout: 60000,
  reconnect: true,
  charset: 'utf8mb4'
};

// Create connection pool
const pool = mysql.createPool(dbConfig);

// Test database connection
const testConnection = async () => {
  try {
    const connection = await pool.getConnection();
    console.log('✅ Connected to MariaDB database');
    connection.release();
  } catch (error) {
    console.error('❌ Failed to connect to MariaDB database:', error);
    console.log('⚠️ Server will start without database connection for initial deployment');
    console.log('🔧 Configure database credentials in Sevalla environment variables');
    console.log('📋 Database connection details needed:');
    console.log(`   - DB_HOST: ${process.env.DB_HOST || 'not set'}`);
    console.log(`   - DB_USER: ${process.env.DB_USER || 'not set'}`);
    console.log(`   - DB_NAME: ${process.env.DB_NAME || 'not set'}`);

    // Don't exit in production to allow deployment to succeed
    if (process.env.NODE_ENV !== 'production') {
      process.exit(-1);
    }
  }
};

// Initialize connection test
testConnection();

// Database query helper function
export const query = async (sql, params = []) => {
  const start = Date.now();
  try {
    const [rows, fields] = await pool.execute(sql, params);
    const duration = Date.now() - start;
    console.log('📊 Executed query', { sql: sql.substring(0, 100) + '...', duration, rowCount: Array.isArray(rows) ? rows.length : 1 });
    return rows; // Return rows directly for easier use
  } catch (error) {
    console.error('❌ Database query error:', error);

    // In production, return empty result instead of crashing
    if (process.env.NODE_ENV === 'production') {
      console.log('⚠️ Returning empty result due to database unavailability');
      return [];
    }
    throw error;
  }
};

// Get a connection from the pool for transactions
export const getConnection = async () => {
  try {
    const connection = await pool.getConnection();
    return connection;
  } catch (error) {
    console.error('❌ Failed to get database connection:', error);
    throw error;
  }
};

// Execute transaction
export const transaction = async (callback) => {
  const connection = await getConnection();
  try {
    await connection.beginTransaction();
    const result = await callback(connection);
    await connection.commit();
    return result;
  } catch (error) {
    await connection.rollback();
    throw error;
  } finally {
    connection.release();
  }
};

export default pool;
