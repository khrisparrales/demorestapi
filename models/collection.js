const mongoose = require("mongoose");

//author schema
const CollectionSchema = new mongoose.Schema({
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
});
module.exports = new mongoose.model("Collection", CollectionSchema);