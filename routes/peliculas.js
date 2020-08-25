const express = require("express");
const router = express.Router();
const { Movie, validateMovie } = require("../models/peliculas");
const jwt = require("jsonwebtoken");
async function verifyToken(req, res, next) {
    try {
        if (!req.headers.authorization) {
            return res.status(401).send("Unauhtorized Request");
        }
        let token = req.headers.authorization.split(" ")[1];
        if (token === "null") {
            return res.status(401).send("Unauhtorized Request");
        }

        const payload = await jwt.verify(token, "secretkey");
        if (!payload) {
            return res.status(401).send("Unauhtorized Request");
        }
        req.userId = payload._id;
        next();
    } catch (e) {
        //console.log(e)
        return res.status(401).send("Unauhtorized Request");
    }
}
//POST: CREATE NEW MOVIE
router.post("/", verifyToken, async(req, res) => {
    const error = await validateMovie(req.body);
    if (error.message) res.status(400).send(error.message);
    movie = new Movie({
        id: req.body.id,
        idimdb: req.body.idimdb,
        idtmdb: req.body.idtmdb,
        key: req.body.key,
        movieName: req.body.movieName,
        description: req.body.description,
        Coll: {
            idColl: req.body.idColl,
            CollName: req.body.CollName,
            imgColl: req.body.imgColl,
            coverColl: req.body.coverColl,
            exist: req.body.exist,
        },
        genre: req.body.genre,
        rate: req.body.rate,
        img: req.body.img,
        cover: req.body.cover,
        url: req.body.url,
    });
    movie
        .save()
        .then((movie) => {
            //  res.status(200).send("ok");
            res.send(movie);
        })
        .catch((error) => {
            res.status(500).send("Movie no store on db");
        });
});
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
router.put("/:movieId", verifyToken, async(req, res) => {
    const updatedMovie = await Movie.findByIdAndUpdate(
        req.params.movieId, {
            idimdb: req.body.idimdb,
            idtmdb: req.body.idtmdb,
            key: req.body.key,
            movieName: req.body.movieName,
            description: req.body.description,
            Coll: {
                idColl: req.body.idColl,
                CollName: req.body.CollName,
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
router.delete("/:movieId", verifyToken, async(req, res) => {
    const movie = await Movie.findByIdAndRemove(req.params.movieId);
    if (!movie) res.status(404).send("Movie with id not found");
    res.send(movie);
});
module.exports = router;