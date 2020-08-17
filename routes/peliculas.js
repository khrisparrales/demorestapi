const express = require("express");
const router = express.Router();
const { Movie, validateMovie } = require("../models/peliculas");
const { Collection } = require("../models/collection");
const { string } = require("yup");

//POST: CREATE NEW genero
router.post("/", async(req, res) => {
    console.log(req.body);
    const error = await validateMovie(req.body);
    if (error.message) res.status(400).send(error.message);

    coll = new Collection({
        idColl: req.body.idCollreq.body.idColl,
    });
    movie = new Movie({
        id: req.body.id,
        edad: req.body.edad,
        idimdb: req.body.idimdb,
        idtmdb: req.body.idtmdb,
        key: req.body.key,
        name: req.body.name,
        description: req.body.description,
        Coll: {
            idColl: req.body.idColl
        },
        genre: req.body.genre,
        rate: req.body.rate,
        img: req.body.img,
        cover: req.body.cover,
        url: req.body.url,
    });
    movie.save().then((movie) => {
            res.status(200).send("ok");
            res.send(movie);
        })
        .catch((error) => {
            res.status(500).send("Movie no store on db ", error);
        });

    //    res.json({ status: "movie save" });

});

// //POST: CREATE NEW MOVIE
// router.post("/", (req, res) => {

//     // const error = validateMovie(req.body);
//     // if (error.message) res.status(400).send(error.message);
//     // movie = new Movie({
//     //     id: req.body.id,idimdb: req.body.idimdb,
//     //     idimdb: req.body.idimdb,
//     //     idtmdb: req.body.idtmdb,
//     //     key: req.body.key,
//     //     name: req.body.name,
//     //     description: req.body.description,
//     //     Coll: {
//     //         idColl: req.body.idColl,
//     //         name: req.body.CollName,
//     //         imgColl: req.body.imgColl,
//     //         coverColl: req.body.coverColl,
//     //         exist: req.body.exist,
//     //     },
//     //     genre: req.body.genre,
//     //     rate: req.body.rate,
//     //     img: req.body.img,
//     //     cover: req.body.cover,
//     //     url: req.body.url,
//     // });
//     movie = new Movie({
//         genre: [req.body.genre],
//         id: req.body.id,
//         idimdb: req.body.idimdb,
//         idtmdb: req.body.idtmdb,
//         key: req.body.key,
//         name: req.body.movieName,
//         description: req.body.description,
//         Coll: {
//             idColl: req.body.idColl,
//             name: req.body.CollName,
//             imgColl: req.body.imgColl,
//             coverColl: req.body.coverColl,
//             exist: req.body.exist,
//         },

//         rate: req.body.rate,
//         img: req.body.img,
//         cover: req.body.cover,
//         url: req.body.url,
//     });
//     movie
//         .save()
//         .then((movie) => {
//             //  res.status(200).send("ok");
//             res.send(movie);
//         })
//         .catch((error) => {
//             res.status(500).send("Movie no store on db ", error);
//         });
// });
//GET: GET ALL MOVIES
router.get("/", (req, res) => {
    Movie.find()
        .then((movies) => res.send(movies))
        .catch((error) => {
            res.status(500).send("Something went wrong get");
        });
});
//GET: GET MOVIE FOR ID
router.get("/:movieId", async(req, res) => {
    //   Movie.findById(req.params.movieId)
    //     .then((movie) => {
    //       if (movie) res.send(movie);
    //       res.status(404).send("Movie not found o exist");
    //     })
    //     .catch((error) => {
    //       res.status(500).send("Movie not found: ", error.message);
    //     });
    const movie = await Movie.findById(req.params.movieId);
    if (!movie) res.status(404).send("Movie not found");
    res.send(movie);
});
//PUT: UPDATE MOVIE BASED ON ID
router.put("/:movieId", async(req, res) => {
    const updatedMovie = await Movie.findByIdAndUpdate(
        req.params.movieId, {
            idimdb: req.body.idimdb,
            idtmdb: req.body.idtmdb,
            key: req.body.key,
            name: req.body.movieName,
            description: req.body.description,
            Coll: {
                idColl: req.body.idColl,
                name: req.body.CollName,
                imgColl: req.body.imgColl,
                coverColl: req.body.coverColl,
                exist: req.body.exist,
            },
            genre: req.body.genre,
            rate: req.body.rate,
            img: req.body.img,
            cover: req.body.cover,
            url: req.body.url,
        }, { new: true }
    );
    if (!updatedMovie) res.status(404).send("Movie not found");
    res.send(updatedMovie);
});

//DELETE: DELETE A movie BASED ON ID
router.delete("/:movieId", async(req, res) => {
    const movie = await Movie.findByIdAndRemove(req.params.movieId);
    if (!movie) res.status(404).send("Movie with id not found");
    res.send(movie);
});
module.exports = router;