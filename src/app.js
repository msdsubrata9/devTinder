const express = require("express");

const app = express();

app.use("/test",(req,res)=>{
    res.send("Hello from the server to the test page");
})

app.use("/hello",(req,res)=>{
    res.send("Namaste from the server to hello page");
})

app.use("/",(req,res)=>{
    res.send("Hello from the serve to home page");
})

app.listen(7777,()=>{
    console.log("Serever is successfully listening on port 7777...");
})