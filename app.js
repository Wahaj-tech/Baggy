//npm init -y
//npm i express mongoose ejs bcrypt jsonwebtoken cookie-parser multer
//npm i dotenv
//npm i connect-flash express-session
//npm i multer

const express = require("express");
const app = express();
const cookieParser = require("cookie-parser");
const path = require("path");
const db = require("./config/mongoose-connection");
const expressSession = require("express-session");
const flash = require("connect-flash");
require("dotenv").config(); //is used to load environment variables from a file named .env into process.env in your Node.js project.
//If you use .env file + require('dotenv').config(), you do NOT need to manually set environment variables in the terminal like:

const ownersRouter = require("./routes/ownersRouter");
const usersRouter = require("./routes/usersRouter");
const productsRouter = require("./routes/productsRouter");
const indexRouter = require("./routes/index");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
//add session after cookie parser alwayss remeber-->
app.use(
  expressSession({
    resave: false,
    saveUninitialized: false,
    secret: process.env.EXPRESS_SESSION_SECRET,
  })
);
app.use(flash());

app.use(express.static(path.join(__dirname, "public")));
app.set("view engine", "ejs");

//learning how to fork

app.use("/", indexRouter);
app.use("/owners", ownersRouter); ///owner seh related saari request bhej di jaayegi ownersRoute p
app.use("/users", usersRouter); //user seh related saari request bhej di jaaye usersRoute p
app.use("/products", productsRouter); //product seh related saari request bhej di jaaye productsRoute p

app.listen(3000);
