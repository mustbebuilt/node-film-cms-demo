require('dotenv').config({path: __dirname + '/.env'});
const express = require("express");
const path = require("path");
const port = 3000;

const app = express();

// add for RESTful
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

const routes = require("./routes/routes");

// for post on form
app.use(express.urlencoded({ extended: false }));

// switch cookie parser on
const cookieParser = require("cookie-parser");
app.use(cookieParser());

// sessions
const session = require("express-session");
// connect-mongo to store session in the db
const MongoStore = require("connect-mongo")(session);

// Basic usage
app.use(
  session({
    secret: "someTopSecret",
    resave: true,
    saveUninitialized: true,
    store: new MongoStore({
      url: "mongodb://127.0.0.1:27017/myTestSession",
    }),
  })
);

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.use(express.static("./public"));

app.use((req, res, next) => {
  console.dir(req.url);
  next();
});

app.use("/", routes(app));

// remove for sample files
app.use((req, res, next) => {
  res.status(404).send("Sorry can't find that!");
  next();
});

// Database
// get driver connection
const dbo = require("./db/connection");

app.listen(port, () => {
  
  console.log(`Server is running on port: ${port}`);
});

module.exports = app;
