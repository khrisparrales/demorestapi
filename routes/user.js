const express = require("express");
const router = express.Router();
const { Movie, validateMovie } = require("../models/peliculas");
const User = require("../models/User");
const jwt = require("jsonwebtoken");
router.post("/signup", async(req, res) => {
    const { email, password } = req.body;
    const newUser = new User({ email, password });
    await newUser.save();
    const token = await jwt.sign({ _id: newUser._id }, "secretkey");
    res.status(200).json({ token });
});
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
router.post("/signin", async(req, res) => {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) return res.status(401).send("The email doen' exists");
    if (user.password !== password) return res.status(401).send("Wrong Password");

    const token = jwt.sign({ _id: user._id }, "secretkey");

    return res.status(200).json({ token });
});
router.get("/private-tasks", verifyToken, (req, res) => {
    res.json([{
            _id: "1",
            name: "task one",
            description: "Arreglar el khrisparrales.github.io",
            date: "2019-11-06T15:50:18.921Z",
        },
        {
            _id: "2",
            name: "task two",
            description: "asdadasd",
            date: "2019-11-06T15:50:18.921Z",
        },
        {
            _id: "3",
            name: "task three",
            description: "asdadasd",
            date: "2019-11-06T15:50:18.921Z",
        },
    ]);
});
router.get("/", verifyToken, (req, res) => {
    res.send("hello");
});












//POST: CREATE NEW MOVIE
// router.post("/", async(req, res) => {
//     const error = await validateMovie(req.body);
//     if (error.message) res.status(400).send(error.message);
//     movie = new Movie({
//         id: req.body.id,
//         idimdb: req.body.idimdb,
//         idtmdb: req.body.idtmdb,
//         key: req.body.key,
//         movieName: req.body.movieName,
//         description: req.body.description,
//         Coll: {
//             idColl: req.body.idColl,
//             CollName: req.body.CollName,
//             imgColl: req.body.imgColl,
//             coverColl: req.body.coverColl,
//             exist: req.body.exist,
//         },
//         genre: req.body.genre,
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
//             res.status(500).send("Movie no store on db");
//         });
// });
// //GET: GET ALL MOVIES
// router.get("/", (req, res) => {
//     Movie.find()
//         .then((movies) => res.send(movies))
//         .catch((error) => {
//             res.status(500).send("Something went wrong get");
//         });
// });
// //GET: GET MOVIE FOR ID
// router.get("/:movieId", async(req, res) => {
//     //   Movie.findById(req.params.movieId)
//     //     .then((movie) => {
//     //       if (movie) res.send(movie);
//     //       res.status(404).send("Movie not found o exist");
//     //     })
//     //     .catch((error) => {
//     //       res.status(500).send("Movie not found: ", error.message);
//     //     });
//     const movie = await Movie.findById(req.params.movieId);
//     if (!movie) res.status(404).send("Movie not found");
//     res.send(movie);
// });
// //PUT: UPDATE MOVIE BASED ON ID
// router.put("/:movieId", async(req, res) => {
//     const updatedMovie = await Movie.findByIdAndUpdate(
//         req.params.movieId, {
//             idimdb: req.body.idimdb,
//             idtmdb: req.body.idtmdb,
//             key: req.body.key,
//             name: req.body.movieName,
//             description: req.body.description,
//             Coll: {
//                 idColl: req.body.idColl,
//                 name: req.body.CollName,
//                 imgColl: req.body.imgColl,
//                 coverColl: req.body.coverColl,
//                 exist: req.body.exist,
//             },
//             genre: req.body.genre,
//             rate: req.body.rate,
//             img: req.body.img,
//             cover: req.body.cover,
//             url: req.body.url,
//         }, { new: true }
//     );
//     if (!updatedMovie) res.status(404).send("Movie not found");
//     res.send(updatedMovie);
// });

// //DELETE: DELETE A movie BASED ON ID
// router.delete("/:movieId", async(req, res) => {
//     const movie = await Movie.findByIdAndRemove(req.params.movieId);
//     if (!movie) res.status(404).send("Movie with id not found");
//     res.send(movie);
// });
module.exports = router;