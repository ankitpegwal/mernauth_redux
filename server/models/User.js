const mongoose = require('mongoose');
const UserSchema = new mongoose.Schema({
    name:{
        type:String
    },
    email:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    phone:{
        type:String,
       
    },
    mobile:{
        type:String,
        required:true
       
    },
    zipCode:{
        type:String,
        required:true
    },
    profilePic:{
        type:String,
        default:""
    },
    latitude:{
        type:String,
        default:0
    },
    longitude:{
        type:String,
        default:0
    },
},{timestamps:true})

module.exports = mongoose.model("User",UserSchema)