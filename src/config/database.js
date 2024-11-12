const mongoose = require("mongoose");
const User = require("../models/user");

const connectDB = async ()=>{
    await mongoose.connect(
        "mongodb+srv://msdsubrata9:uaLUJTAN1UO5dNej@namastenode.qgsag.mongodb.net/devTinder",{autoSelectFamily: false}
    );
};


module.exports = connectDB;