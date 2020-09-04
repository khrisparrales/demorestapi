const express = require("express");
const router = express.Router();
//const { Collec, validateMovie } = require("../models/collec");
const { Series } = require("../models/series");
//const { Collection } = require("../models/collection")
const jwt = require("jsonwebtoken");
const { Console } = require("winston/lib/winston/transports");

//GET: GET ALL SERIES
router.get("/", (req, res) => {
    Series.find()
        .then((series) => res.send(series))
        .catch((error) => {
            res.status(500).send("Something went wrong get");
        });
    // res.send("hello series")
});
//GET: GET SERIE FOR ID
router.get("/:seriesId", async(req, res) => {
    const series = await Series.findById(req.params.seriesId);
    if (!series) res.status(404).send("Serie not found");
    res.send(series);
});


//POST: CREATE NEW SERIE
router.post("/", async(req, res) => {
    // const error = await Series.findOne({req.body.id});
    const { id } = req.body;
    const idm = await Series.findOne({ id });
    if (idm) {
        res.status(401).send("The series  exists");
    } else {
        series = new Series({
            id: req.body.id,
            name: req.body.name,
            overview: req.body.overview,
            rate: req.body.rate,
            img: req.body.img,
            cover: req.body.cover,
            seasons: req.body.seasons,
            in_production: req.body.in_production,
            genres: req.body.genres,
            date: req.body.date,

            //   Coll: {
            //     idColl: req.body.idColl,
            //     CollName: req.body.CollName,
            //     imgColl: req.body.imgColl,
            //     coverColl: req.body.coverColl,
            //     exist: req.body.exist,
            //   },

        });


        series
            .save()
            .then((series) => {
                //  res.status(200).send("ok");
                res.send(series);
            })
            .catch((error) => {
                res.status(500).send("Serie no store on db");
            });
    }

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
//DELETE: DELETE A movie BASED ON ID
router.delete("/:seriesId", async(req, res) => {
    const series = await Series.findByIdAndRemove(req.params.seriesId);
    if (!series) res.status(404).send("series with id not found");
    res.send(series);
});

module.exports = router;