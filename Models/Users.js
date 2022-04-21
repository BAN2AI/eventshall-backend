const mongoose = require('mongoose')
const Schema = mongoose.Schema

let Users = new Schema({

    _id : Schema.Types.ObjectId,

    image : {
        type : String,
    },

    //regEx
    email : {
        type : String,
        required : true,
        unique : true
    },

    number : {
        type : String,
    },

    name : {
        type : String,
        required : true
    },

    pass : {
        type : String,
        required : true
    },

    type : {
        type : String,
    }
}) 

module.exports = mongoose.model('Users', Users)