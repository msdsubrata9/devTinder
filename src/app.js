const express = require("express");

const app = express();

app.get("/user/:userId",(req,res)=>{
    console.log(req.query);
    console.log(req.params);
    res.send({firstName:"Subrata",lastName:"Saha"});
});

app.listen(7777,()=>{
    console.log("Serever is successfully listening on port 7777...");
})