const express = require("express");
const connectDB = require("./config/database");
const app = express();
const User  = require("./models/user");
const {validateSignupData} = require("./utils/validation");
const bcrypt = require("bcrypt");
const cookieParser = require("cookie-parser");
const jwt = require("jsonwebtoken");
const {userAuth} = require("./middlewares/auth");

app.use(express.json());
app.use(cookieParser);

app.post("/signup", async (req, res, next) => {
  try {
    // validate signup data
    validateSignupData(req);
    const { firstName, lastName, emailId, password } = req.body;
    // encrypt the password
    const passwordHash = await bcrypt.hash(password, 10);

    const user = new User({
      firstName,
      lastName,
      emailId,
      password: passwordHash,
    });
    await user.save();
    res.send("User added successfully");
  } catch (err) {
    res.status(400).send("Error saving the user" + err.message);
  }
});

app.post("/login", async (req, res) => {
  try {
    const { emailId, password } = req.body;
    const user = await User.findOne({ emailId: emailId });
    if (!user) {
      throw new Error("Invalid Creds");
    }
    const isPasswordValid = await user.validatePassword(password);
    if (isPasswordValid) {
      // create the JWT token
      const token = await user.getJWT();
      // add the token to the cookie and send the response back to the user
      res.send("token",token);
      res.send("Login Successful");
    } else {
      throw new Error("Invalid Creds");
    }
  } catch (err) {
    res.status(400).send("ERROR: " + err.message);
  }
});

app.get("/profile", userAuth, async(req, res) => {
  try{
    const user = req.user;
    res.send(user);
  } catch(err){
    res.status(400).send("ERROR : " + err.message);
  }
})

connectDB()
  .then(() => {
    console.log("Database connection established successfully");
    app.listen(7777, () => {
      console.log("Serever is successfully listening on port 7777...");
    });
  })
  .catch((err) => {
    console.error("Database is unable to connect!!!");
  });
