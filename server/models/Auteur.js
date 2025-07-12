const mongoose = require('mongoose');

const AuteurShema = mongoose.Schema(
    {
    name : {
        type : String,
        required : true
    },
    imageURL : {
        type : String,
        required : true
    },
    Twitter : {
        type : String,
        required : true
    },
    Instagram : {
        type : String,
        required : true
    },
    },
    { timestamps: true }
);

module.exports = mongoose.model("auteur",AuteurShema);