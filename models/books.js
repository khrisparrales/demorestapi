const mongoose = require("mongoose");
const Author = require("./author");
const Coll = require("./collection");
const yup = require("yup");
//book schema
const BooksSchema = new mongoose.Schema({
    id: {
        type: Number,
        required: true,
        minlength: 1,
        maxlength: 10,
    },
    idimdb: {
        type: String,
        required: true,
        minlength: 1,
        maxlength: 10,
    },
    idtmdb: {
        type: Number,
        required: true,
        minlength: 1,
        maxlength: 10,
    },
    key: {
        type: String,
        required: true,
        minlength: 3,
        maxlength: 50,
    },
    name: {
        type: String,
        required: true,
        minlength: 3,
        maxlength: 50,
    },
    description: {
        type: String,
        required: true,
        minlength: 3,
        maxlength: 1000,
    },
    Coll: Coll.schema,
    genre: {
        type: String,
        required: true,
        minlength: 3,
        maxlength: 20,
    },
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

const validateBook = (book) => {
    const schema = yup.object().shape({
        description: yup.string().required().min(3, 'Description es muy corta si no tiene agrege null').max(1000),
        //add more restrinction
    });
    return schema
        .validate(book)
        .then((book) => book)
        .catch((error) => {
            //console.log(error));
            return { message: error.message }
        });
};

exports.Book = new mongoose.model("Book", BooksSchema);
exports.validateBook = validateBook;