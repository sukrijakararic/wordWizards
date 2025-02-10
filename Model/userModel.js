const db = require("../DB/pool");
const bcrypt = require("bcrypt");

const getUserByEmail = async (email) => {
  try {
    const result = await db.query(
      "SELECT * FROM users WHERE email = LOWER($1)",
      [email]
    );
    return result.rows[0];
  } catch (err) {
    console.log(err);
  }
};

const registerUser = async (request, response, next) => {
  // Extract the email, password, firstname, and lastname from the request body
  const { email, password, username } = request.body;
  const existingUser = await getUserByEmail(email);

  if (!email || !password || !username) {
    response.status(400).json({ message: "All fields are required" });
    return;
  }

  // Check if the email already exists in the database
  else if (existingUser) {
    return response
      .status(400)
      .json({ message: "Hmm.. That user already exists" });
  }

  // Hash the password using bcrypt
  const hashedPassword = await bcrypt.hash(password, 10);

  try {
    // Insert the user into the database and return the newly inserted user
    const result = await db.query(
      "INSERT INTO users (email, password, username) VALUES (LOWER($1), $2, $3) RETURNING *",
      [email, hashedPassword, username]
    );

    // Return a 201 Created response with the newly inserted user
    response.status(201).json({ message: "User created" });
  } catch (err) {
    console.log(err);
  }
};

const showUser = async (request, response, next) => {
  console.log("showUser: ", request.user);
  if (!request.user) {
    response.status(401).json({ message: "Please log in" });
  } else {
    const result = await db.query("SELECT email, username FROM users where email = $1", [
      request.user.email,
    ]);
    response.json(result.rows[0]);
  }
};

module.exports = {
  getUserByEmail,
  registerUser,
  showUser,
};
