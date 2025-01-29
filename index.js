const express = require("express");
const app = express();
const cors = require("cors");
const session = require("express-session");
const { PORT, SESSION_SECRET } = require("./config");
const helmet = require("helmet");
const bodyParser = require("body-parser");
const userRouter = require("./Controller/userController");

app.use(express.json());
app.use(cors());
app.use(helmet());
app.use(
    session({
        secret: SESSION_SECRET,
        resave: true,
        saveUninitialized: true
    })
);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.set("trust proxy", 1);


app.get("/", (req, res) => {
    res.send("Hello World!");
});

app.use("/api", userRouter);


app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});