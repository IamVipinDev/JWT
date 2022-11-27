require("dotenv").config();
require("./config/db");
const express = require("express");
const app = express();

//importing user context
const User = require("./model/user");

//Register
app.post("/register", (req, res) => {
  //our register logic
  console.log("register endpoint");
});

app.post("/login", (req, res) => {
  //out login logic here
  console.log("login endpoint");
});

app.use(express.json());

//Logic goes here

module.exports = app;
