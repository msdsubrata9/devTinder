const express = require("express");

const app = express();

const {adminAuthrization, userAuthrization} = require("./middlewares/auth");

app.use("/admin",adminAuthrization);

app.get("/admin/getAllData",(req,res,next)=>{
    res.send("Sending all the data to the Admin");
})

app.get("/admin/deleteUser",(req,res,next)=>{
    res.send("delete the user data");
})

app.get("/user", userAuthrization,(req,res,next)=>{
    res.send("User data Sent");
})

app.post("/user/login",(req,res,next)=>{
    res.send("User loggedin Successfully");
})

app.listen(7777,()=>{
    console.log("Serever is successfully listening on port 7777...");
})