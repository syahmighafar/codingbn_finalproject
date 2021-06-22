const mongoose = require('mongoose');

var schema = new mongoose.Schema({
    
    X : {
        type: String,
        default: "Food",
        enum: ["Food", "Drink"]
    },
    Brand :{
        type : String,
        required: true,
        trim: true

    },
    Name :{
        type : String,
        required: true,
        trim: true

    },
    CountryOfOrigin:{
        type : String,
        required: true,
        trim: true

    },
    HalalStatus: {
        type: String,
        default: "Halal",
        enum: ["Halal", "Haram", "Mushbooh"]
    },
    LastDateofCertification:{
        type : String,
        required: true,
    },

    LastDateofReview:{
        type : String,
        required: true
    },


})

const Itemdb = mongoose.model('itemdb', schema);

module.exports = Itemdb;