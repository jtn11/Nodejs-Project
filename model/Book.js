const mongoose = require("mongoose")

mongoose.connect("mongodb://127.0.0.1:27017/Nodejs-BookStore");

const BookSchema = mongoose.Schema({

    Title : String , 
    Author : String , 
    Publisher : String , 
    PublishedDate : String
}, {timeStamps : true})


module.exports = mongoose.model("BookStore" , BookSchema);

