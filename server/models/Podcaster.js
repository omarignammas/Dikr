const mongoose = require('mongoose');

const PodcasterShema = mongoose.Schema(
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

module.exports = mongoose.model("podcaster",PodcasterShema);