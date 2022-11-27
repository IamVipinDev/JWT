const express = require("express");
require("dotenv").config();
require("./config/db");
const PORT = process.env.API_PORT;
const app = express();

app.use(express.json());

app.get("/", (req, res) => {
  res.json({
    Id: "this work",
  });
});

app.listen(PORT, () => {
  console.log(`Server listening on PORT ${PORT}...`);
});
