const mongoose = require("mongoose");
const Author = require("./author");
const Coll = require("./collection");
const yup = require("yup");
//book schema
const MoviesSchema = new mongoose.Schema({
    id: {
        type: Number,
        required: true,
        minlength: 1,
        maxlength: 1000,
    },
    idimdb: {
        type: String,
        required: true,
        minlength: 1,
        maxlength: 1000,
    },
    idtmdb: {
        type: Number,
        required: true,
        minlength: 1,
        maxlength: 1000,
    },
    key: {
        type: String,
        required: true,
        minlength: 3,
        maxlength: 1000,
    },
    movieName: {
        type: String,
        required: true,
        minlength: 3,
        maxlength: 1000,
    },
    description: {
        type: String,
        required: true,
        minlength: 3,
        maxlength: 1000,
    },
    Coll: {

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
        }
    },
    genre: [{
        type: String,
        required: true,
        minlength: 3,
        maxlength: 20,
    }, ],
    rate: {
        type: Number,
        min: 1,
        max: 11,
    },
    // duration: {
    //     type: String,
    //     required: true,
    //     minlength: 3,
    //     maxlength: 20,
    // },
    img: {
        type: String,
        required: true,
        minlength: 3,
        maxlength: 300,
    },
    cover: {
        type: String,
        required: true,
        minlength: 3,
        maxlength: 300,
    },
    url: {
        type: String,
        required: true,
        minlength: 3,
        maxlength: 300,
    },
});

const validateMovie = (movie) => {
    const schema = yup.object().shape({
        description: yup
            .string()
            .required()
            .min(3, "Description es muy corta si no tiene agrege null")
            .max(1000),
        //add more restrinction
    });
    return schema
        .validate(movie)
        .then((movie) => movie)
        .catch((error) => {
            //console.log(error));
            return { message: error.message };
        });
};

exports.Movie = new mongoose.model("movies", MoviesSchema);
exports.validateMovie = validateMovie;