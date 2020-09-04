const mongoose = require("mongoose");




const SeriesSchema = new mongoose.Schema({
    id: {
        type: Number,
    },
    name: {
        type: "String",
    },
    overview: {
        type: "String",
    },
    rate: {
        $numberDouble: {
            type: "Date",
        },
    },
    img: {
        type: "String",
    },
    cover: {
        type: "String",
    },
    seasons: {
        type: ["Mixed"],
    },
    in_production: {
        type: "Boolean",
    },
    genres: {
        type: ["String"],
    },
    date: {
        type: Number,
    },
});
//book schema
// const SeriesSchema = new mongoose.Schema({
//     idColl: {
//         type: Number,
//         min: 1,
//         max: 999999,
//     },
//     CollName: {
//         type: String,
//         //     required: true,
//         minlength: 3,
//         maxlength: 300,
//     },
//     imgColl: {
//         type: String,
//         //   required: true,
//         minlength: 3,
//         maxlength: 300,
//     },
//     coverColl: {
//         type: String,
//         // required: true,
//         minlength: 3,
//         maxlength: 300,
//     },
//     exist: {
//         type: Boolean,
//         required: true,
//         //   minlength: 3,
//         //  maxlength: 300,
//     },
//     // peliculas: {
//     //     type: ["Mixed"],
//     // },
//     peliculas: [{
//         type: String,

//     }, ],


// });

exports.Series = new mongoose.model("series", SeriesSchema);
//exports.validateMovie = validateMovie;