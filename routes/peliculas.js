const express = require("express");
const router = express.Router();
const { Movie, validateMovie } = require("../models/peliculas");
const { Collec } = require("../models/collec");
//const { Collection } = require("../models/collection")
const jwt = require("jsonwebtoken");
const { Console } = require("winston/lib/winston/transports");
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
    const { idtmdb } = req.body;
    const idtm = await Movie.findOne({ idtmdb });
    if (idtm) {
        res.status(401).send("The movie  exists");
    }
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
    if (req.body.exist == true) {
        const { idColl } = req.body;
        const idCollec = await Collec.findOne({ idColl });
        if (!idCollec) {
            coll = new Collec({
                //     _id: req.body.idColl,
                idColl: req.body.idColl,
                CollName: req.body.CollName,
                imgColl: req.body.imgColl,
                coverColl: req.body.coverColl,
                exist: req.body.exist,
                //peliculas: req.body._id,
                peliculas: [movie._id]
            });
            coll.save();
        } else {
            var query = await Collec.findOne({
                idColl: movie.Coll.idColl,
            });
            console.log(query.CollName);
            const updatedcoll = await Collec.findByIdAndUpdate(
                query._id, { $push: { peliculas: [movie._id] } }, { new: true }
            );
        }

        // console.log("Es " + movie.Coll._id);
        // coll = new Collec({
        //   //  _id: movie.Coll._id,
        //   idColl: req.body.idColl,
        //   CollName: req.body.CollName,
        //   imgColl: req.body.imgColl,
        //   coverColl: req.body.coverColl,
        //   exist: req.body.exist,
        // });
        // coll.save();

    } else {
        console.log("Es false");
    }
    movie
        .save()
        .then((movie) => {
            //  res.status(200).send("ok");
            res.send(movie);
        })
        .catch((error) => {
            res.status(500).send("Movie no store on db" + error);
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