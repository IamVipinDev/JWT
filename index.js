const express = require("express");
const app = express();

app.get("/", (req, res) => {
  console.log("It works");
});

app.listen(3000, () => {
  console.log("Server started working");
});
