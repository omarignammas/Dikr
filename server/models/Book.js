const mongoose = require('mongoose');

const BookShema = mongoose.Schema(
    {
    name : {
        type : String,
        required : true
    },
    imageURL : {
        type : String,
        required : true
    },
    BookURL : {
        type : String,
        required : true
    },
    Auteur : {
        type : String,
    },
    Language : {
        type : String,
        required : true
    },
    Category : {
        type : String,
        required : true
    },
    },
    { timestamps : true }
);

module.exports = mongoose.model("book",BookShema);