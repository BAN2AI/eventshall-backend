const mongoose = require('mongoose')
const Schema = mongoose.Schema

let Salles = new Schema({

    _id : Schema.Types.ObjectId,

    nom : {
        required : true,
        type : String,
        unique : true
    },

    images : [{
        type : String
    }],

    //object
    localistation : {
        lat : {
            type : String
        },
        long : {
            type : String
        }
    },

    ville : {
        type : String,
    },

    commune : {
        type : String
    },

    prix : {
        type : String
    },

    place : {
        type : String
    },

    Adresse : {
        type : String
    },

    pays : {
        type : String
    },

    rate : {
        type : Number
    },

    gestionaire : {
        type : String
    },

    commentaire : {
        type : String
    },

    review : [{
        type : String
    }]

}) 

module.exports = mongoose.model('Salles', Salles)