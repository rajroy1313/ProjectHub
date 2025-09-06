const mysql = require('mysql2/promise');

async function createDatabase() {
  try {
    // Connect to MySQL server
    const connection = await mysql.createConnection({
      host: 'localhost',
      user: 'root',
      password: '',
      multipleStatements: true
    });

    console.log('Connected to MySQL server');

    // Create database and tables
    await connection.execute('CREATE DATABASE IF NOT EXISTS projecthub');
    console.log('Database created successfully');

    await connection.execute('USE projecthub');

    // Create sessions table
    await connection.execute(`
      CREATE TABLE IF NOT EXISTS sessions (
        sid VARCHAR(255) PRIMARY KEY,
        sess JSON NOT NULL,
        expire TIMESTAMP NOT NULL,
        INDEX IDX_session_expire (expire)
      )
    `);

    // Create users table  
    await connection.execute(`
      CREATE TABLE IF NOT EXISTS users (
        id VARCHAR(36) PRIMARY KEY DEFAULT (UUID()),
        email VARCHAR(255) UNIQUE,
        first_name VARCHAR(255),
        last_name VARCHAR(255),
        profile_image_url VARCHAR(500),
        google_id VARCHAR(255) UNIQUE,
        discord_id VARCHAR(255) UNIQUE,
        facebook_id VARCHAR(255) UNIQUE,
        username TEXT UNIQUE,
        password TEXT,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
      )
    `);

    // Create project_requests table
    await connection.execute(`
      CREATE TABLE IF NOT EXISTS project_requests (
        id VARCHAR(36) PRIMARY KEY DEFAULT (UUID()),
        user_id VARCHAR(36) NOT NULL,
        title TEXT NOT NULL,
        description TEXT NOT NULL,
        budget VARCHAR(100),
        timeline VARCHAR(100),
        technologies JSON,
        status VARCHAR(50) DEFAULT 'pending',
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
        FOREIGN KEY (user_id) REFERENCES users(id)
      )
    `);

    console.log('All tables created successfully');
    await connection.end();
    console.log('Database setup completed!');
  } catch (error) {
    console.error('Database setup failed:', error.message);
    process.exit(1);
  }
}

createDatabase();