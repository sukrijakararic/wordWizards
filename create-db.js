const { Client } = require("pg");
const { DB } = require("./config");

(async () => {
  // The tables will be here

  const usersTableStmt = `
    CREATE TABLE IF NOT EXISTS users (
      id SERIAL PRIMARY KEY,
      username VARCHAR(255) UNIQUE NOT NULL,
      password VARCHAR(255) NOT NULL,
      email VARCHAR(255) UNIQUE NOT NULL,
      google_profile JSON,
      github_profile JSON,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );
  `;

  const userSampleData = `
    INSERT INTO users (username, password, email)
    VALUES 
      ('goodBoy', '1', 'dog@email.com');
      `;

  const blogsTableStmt = `
    CREATE TABLE IF NOT EXISTS blogs (
      id SERIAL PRIMARY KEY,
      title VARCHAR(255) NOT NULL,
      content TEXT NOT NULL,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      updated_at TIMESTAMP,
      user_id INT,
      updoots INT DEFAULT 0,
      tags VARCHAR(255)[],
      FOREIGN KEY (user_id) REFERENCES users(id)
    );
  `;

  const commentsTableStmt = `
    CREATE TABLE IF NOT EXISTS comments (
      id SERIAL PRIMARY KEY,
      content TEXT NOT NULL,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      updated_at TIMESTAMP,
      blog_id INT,
      user_id INT,
     updoots INT DEFAULT 0,
      FOREIGN KEY (user_id) REFERENCES users(id),
      FOREIGN KEY (blog_id) REFERENCES blogs(id)
    );
  `;

  const insertBlogsStmt = `
    INSERT INTO blogs (title, content, user_id)
    VALUES 
      ('Lorem Ipsum', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.', 1),
      ('Vestibulum', 'Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae.', 1);
  `;

  try {
    const db = new Client({
      user: DB.PGUSER,
      host: DB.PGHOST,
      database: DB.PGDATABASE,
      password: DB.PGPASSWORD,
      port: DB.PGPORT,
    });

    await db.connect();

    // Create tables on database
    // Make sure to query any tables added
    await db.query(usersTableStmt);
    await db.query(blogsTableStmt);
    await db.query(commentsTableStmt);

    // Insert sample
    await db.query(userSampleData);
    await db.query(insertBlogsStmt);

    await db.end();
  } catch (err) {
    console.log("ERROR CREATING ONE OR MORE TABLES: ", err);
  }
})();
