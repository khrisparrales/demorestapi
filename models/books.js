const mongoose = require('mongoose');
const Author = require('./author');
const Coll = require('./collection');
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
module.exports = new mongoose.model('Book', BooksSchema);