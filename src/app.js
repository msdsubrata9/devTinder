const express = require("express");
const connectDB = require("./config/database");
const app = express();
const User  = require("./models/user");

app.post("/signup", async (req, res, next) => {
  const user = new User({
    firstName: "Subrata",
    lastName: "Saha",
    emailId: "subrata.saha@gmail.com",
    password: "Subrata@1808",
  });

  try{
    await user.save();
    res.send("User added successfully");
  } catch(err){
    res.status(400).send("Error saving the user"+err.message);
  }
});

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
