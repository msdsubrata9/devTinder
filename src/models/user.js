const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    firstName:{
        type: String,
        required: true,
        minLength:3,
        maxLength:63,
    },
    lastName:{
        type: String
    },
    emailId:{
        type: String,
        required:true,
        trim:true,
        lowercase: true,
        unique:true,
    },
    password:{
        type: String,
        required: true,
        minLength: 7,
        maxLength: 63,
    },
    age:{
        type: Number,
        min:18,
    },
    gender:{
        type: String,
        validate(value){
            if(!["male","female","other"].includes(value)){
                throw new Error("Gender in not valid");
            }
        }
    },
    skills:{
        type: [String],
    },
    about:{
        type: String,
        default:"This is a default description of the user!",
    },
},
{
    timestamps:true,
}
)

const User = mongoose.model("User",userSchema);

module.exports = User;