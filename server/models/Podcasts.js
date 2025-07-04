const mongoose = require('mongoose');

const PodcastShema = mongoose.Schema(
    {
    name : {
        type : String,
        required : true
    },
    imageURL : {
        type : String,
        required : true
    },
    PodcastURL : {
        type : String,
        required : true
    },
    Album : {
        type : String,
    },
    Podcaster : {
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

module.exports = mongoose.model("podcast",PodcastShema);