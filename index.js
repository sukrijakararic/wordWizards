const express = require("express");
const app = express();
const cors = require("cors");
const session = require("express-session");
const { PORT, SESSION_SECRET } = require("./config");
const helmet = require("helmet");
const bodyParser = require("body-parser");
const passport = require("./strategies/main");
const userRouter = require("./Controller/userController");
const blogsRouter = require("./Controller/blogsController");
const commentRouter = require("./Controller/commentController");
const googleRouter = require("./Controller/googleRouter");

app.use(express.json());
app.use(cors());
app.use(helmet());
app.use(
  session({
    secret: SESSION_SECRET,
    resave: true,
    saveUninitialized: true,
    cookie: {
      maxAge: 60 * 60 * 1000,
      httpOnly: true,
      secure: false,
    },
  })
);

app.use(passport.initialize());
app.use(passport.session());

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.set("trust proxy", 1);

app.get("/", (req, res) => {
  res.send("Hello World!, test, test");
});

app.use("/api", userRouter, blogsRouter, commentRouter, googleRouter);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
