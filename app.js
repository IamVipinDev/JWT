require("dotenv").config();
require("./config/db");
const express = require("express");
const app = express();
const bcrypt = require("bcryptjs");
const auth = require("./middleware/auth");
//accessing JSON object from the Request
app.use(express.json());

//importing user context
const User = require("./model/user");
const jwt = require("jsonwebtoken");

//Register
app.post("/register", async (req, res) => {
  try {
    // Get user input
    const { first_name, last_name, email, password } = req.body;

    // Validate user input
    if (!(email && password && first_name && last_name)) {
      res.status(400).send("All input is required");
    }

    //Check if user already exist in Database
    const olduser = User.findOne({ email });
    if (olduser) {
      return res.status(409).send("User Already Exist, Please login");
    }

    //Encrypt user password
    encryptedPassword = await bcrypt.hash(password, 10);

    //Create user in our database
    const user = await User.create({
      first_name,
      last_name,
      email: email.toLowerCase(),
      password: encryptedPassword,
    });

    // Create token
    const token = jwt.sign(
      { user_id: user._id, email },
      process.env.TOKEN_KEY,
      { expiresIn: "2h" }
    );

    //save token
    user.token = token;

    //return new user
    res.status(201).json(user);
  } catch (error) {
    console.log(error);
  }
});

app.post("/login", async (req, res) => {
  // Our login logic starts here
  try {
    // Get user input
    const { email, password } = req.body;

    // Validate user input
    if (!(email && password)) {
      res.status(400).send("All input is required");
    }
    // Validate if user exist in our database
    const user = await User.findOne({ email });

    if (user && (await bcrypt.compare(password, user.password))) {
      // Create token
      const token = jwt.sign(
        { user_id: user._id, email },
        process.env.TOKEN_KEY,
        {
          expiresIn: "2h",
        }
      );

      // save user token
      user.token = token;

      // user
      res.status(200).json(user);
    }
  } catch (err) {
    res.status(400).send("Invalid Credentials");
    console.log(err);
  }
  // Our register logic ends here
});

app.post("/welcome", auth, (req, res) => {
  const { first_name } = req.body;
  res.status(200).send(`Welcome  ${first_name} 🙌`);
});
module.exports = app;
