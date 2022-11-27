const mongoose = require("mongoose");
require("dotenv").config();
const { MONGO_URI } = process.env;
module.exports = mongoose.connect(
  MONGO_URI,
  {
    useNewUrlParser: true,
    useFindAndModify: false,
    useUnifiedTopology: true,
  },
  () => {
    console.log("Connected to Database");
  }
);
