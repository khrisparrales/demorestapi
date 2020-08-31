const express = require("express");
const router = express.Router();
//const { Collec, validateMovie } = require("../models/collec");
const { Collec } = require("../models/collec");
//const { Collection } = require("../models/collection")
const jwt = require("jsonwebtoken");
const { Console } = require("winston/lib/winston/transports");

//GET: GET ALL MOVIES
router.get("/", (req, res) => {
    Collec.find()
        .then((collec) => res.send(collec))
        .catch((error) => {
            res.status(500).send("Something went wrong get");
        });
});
//GET: GET MOVIE FOR ID
router.get("/:collecId", async(req, res) => {
    const collec = await Collec.findById(req.params.collecId);
    if (!collec) res.status(404).send("Movie not found");
    res.send(collec);
});

//Editar collecion
router.put("/:collecId", async(req, res) => {
    const updatedMovie = await Collec.findByIdAndUpdate(
        req.body._id, {
            idColl: req.body.idColl,
            CollName: req.body.CollName,
            imgColl: req.body.imgColl,
            movieName: req.body.movieName,
            coverColl: req.body.coverColl,
            exist: req.body.exist,
            peliculas: req.body.peliculas,
        }, { new: true }
    );
    if (!updatedMovie) res.status(404).send("Movie not found");
    res.send(updatedMovie);
});


module.exports = router;