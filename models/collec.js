const mongoose = require("mongoose");

//book schema
const CollecSchema = new mongoose.Schema({
    idColl: {
        type: Number,
        min: 1,
        max: 999999,
    },
    CollName: {
        type: String,
        //     required: true,
        minlength: 3,
        maxlength: 300,
    },
    imgColl: {
        type: String,
        //   required: true,
        minlength: 3,
        maxlength: 300,
    },
    coverColl: {
        type: String,
        // required: true,
        minlength: 3,
        maxlength: 300,
    },
    exist: {
        type: Boolean,
        required: true,
        //   minlength: 3,
        //  maxlength: 300,
    },
    // peliculas: {
    //     type: ["Mixed"],
    // },
    peliculas: [{
        type: String,

    }, ],


});

exports.Collec = new mongoose.model("collection", CollecSchema);
//exports.validateMovie = validateMovie;