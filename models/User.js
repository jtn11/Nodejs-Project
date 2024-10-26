const mongoose = require("mongoose");

mongoose.connect("mongodb://127.0.0.1:27017/Nodejs-Demo");

const UserSchema = mongoose.Schema({
      name : String, 
      email : String,
      password : String

}, {timestamps : true})

module.exports  = mongoose.model('user', UserSchema);
