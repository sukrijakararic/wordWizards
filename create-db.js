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

  const postsTableStmt = `
    CREATE TABLE IF NOT EXISTS posts (
      id SERIAL PRIMARY KEY,
      title VARCHAR(255) NOT NULL,
      content TEXT NOT NULL,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      updated_at TIMESTAMP,
      user_id INT,
      FOREIGN KEY (user_id) REFERENCES users(id)
    );
  `;

  const commentsTableStmt = `
    CREATE TABLE IF NOT EXISTS comments (
      id SERIAL PRIMARY KEY,
      content TEXT NOT NULL,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      post_id INT,
      FOREIGN KEY (post_id) REFERENCES posts(id)
    );
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
    await db.query(postsTableStmt);
    await db.query(commentsTableStmt);

    await db.end();
  } catch (err) {
    console.log("ERROR CREATING ONE OR MORE TABLES: ", err);
  }
})();
