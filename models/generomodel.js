const mongoose = require("mongoose");
//const Author = require("./author");
//const Coll = require("./collection");
const yup = require("yup");
//book schema
const Generoschema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        // minlength: 3,
        // maxlength: 50,
    },
    edad: {
        type: String,
        required: false,
        // minlength: 3,
        // maxlength: 50,
    },
    clase: [{
        type: String,
        required: false,
    }, ],
    versionKey: false,
}, {
    versionKey: false // set to false then it wont create in mongodb
});



exports.Genero = new mongoose.model("genero", Generoschema);
//exports.validateMovie = validateMovie;