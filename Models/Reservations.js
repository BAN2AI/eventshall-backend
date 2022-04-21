const mongoose = require('mongoose')
const Schema = mongoose.Schema

let Reservations = new Schema({

    _id : Schema.Types.ObjectId,

    nom : {
        type : String,
        required : true,
        // unique : true
    },

    datedebut : {
        type : Date,
        // default : 
    },

    datefin : {
        type : Date
    },

    clients : {
        type : String,
        required : true
    },

    contacts : {
        type : String
    },

    descrition : {
        type : String
    }
}) 

module.exports = mongoose.model('Reservations', Reservations)