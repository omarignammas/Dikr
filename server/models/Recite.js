const mongoose = require('mongoose');

const ReciteShema = mongoose.Schema(
    {
    name : {
        type : String,
        required : true
    },
    imageURL : {
        type : String,
        required : true
    },
    ReciteURL : {
        type : String,
        required : true
    },
    Album : {
        type : String,
    },
    Reciter : {
        type : String,
        required : true
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

module.exports = mongoose.model("recite",ReciteShema);