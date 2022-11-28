const mongoose = require("mongoose");
require("dotenv").config();
const { MONGO_URI } = process.env;
module.exports = mongoose.connect(MONGO_URI, () => {
  console.log("Connected to MongoDB");
});
