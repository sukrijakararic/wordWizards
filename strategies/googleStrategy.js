const GoogleStrategy = require("passport-google-oauth20").Strategy;
const { CLIENTID, CLIENTSECRET, CALLBACKURL } = process.env;
const db = require("../DB/pool");

module.exports = function (passport) {
  passport.use(
    new GoogleStrategy(
      {
        clientID:
          CLIENTID,
        clientSecret: CLIENTSECRET,
        callbackURL: CALLBACKURL,
      },
      async function (accessToken, refreshToken, profile, done) {
        try {
          const result = await db.query("SELECT * FROM users WHERE email = $1", [
            profile.emails[0].value,
          ]);
          if (result.rows.length > 0) {
            return done(null, result.rows[0]);
          }

          console.log(profile);
    
          const insertedUser = await db.query(
            "INSERT INTO users (email, username, google_profile) VALUES ($1, $2, $3) RETURNING *",
            [profile.emails[0].value, profile.displayName, profile]
          );
    
    
          return done(null, insertedUser.rows[0]);
        } catch (err) {
          console.log(err);
          return done(err);
        }
      }
    )
  );
};
