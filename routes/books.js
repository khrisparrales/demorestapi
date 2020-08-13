const express = require('express');
const router = express.Router();
const Book = require('../models/books');

//POST: CREATE NEW BOOK
router.post('/', (req, res) => {
    book = new Book({
        id: req.body.id,
        idimdb: req.body.idimdb,
        idtmdb: req.body.idtmdb,
        key: req.body.key,
        name: req.body.bookName,
        description: req.body.description,
        Coll: {
            idColl: req.body.idColl,
            name: req.body.CollName,
            imgColl: req.body.imgColl,
            coverColl: req.body.coverColl,
            exist: req.body.exist
        },
        genre: req.body.genre,
        rate: req.body.rate,
        img: req.body.img,
        cover: req.body.cover,
        url: req.body.url,
    });
    book.save().then(book => {
        res.send(book);
    }).catch(error => {
        res.status(500).send("Book no store on db");
    })
})
module.exports = router;