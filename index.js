const express = require('express');
const mongo = require('mongoose');
require('dotenv').config();
const app = express();
const PeliculasRoute = require('./routes/peliculas');
const winston = require('winston');

const PORT = process.env.PORT || 3000;


//connnect to mongodb atlas
mongo.connect(
    process.env.MONGO_URL, { useNewUrlParser: true }
).then(() => {
    // console.log("Connect to mongodb Atlas");
    logger.log("info", "Connect to mongodb Atlas");
}).catch(error => {
    //  console.log("Something wrong error", error)
    logger.error(error.message);
});
//middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// Add headers
app.use(function(req, res, next) {

    // Website you wish to allow to connect
    res.setHeader("Access-Control-Allow-Origin",

        "*"
    );
    // res.setHeader("Access-Control-Allow-Origin", "http://localhost:4200");
    // res.setHeader(
    //     "Access-Control-Allow-Origin",

    // );
    // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

    // Request headers you wish to allow
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    res.setHeader('Access-Control-Allow-Credentials', true);

    // Pass to next layer of middleware
    next();
});


//create a logger
const logger = winston.createLogger({
    level: "info",
    transports: [
        new winston.transports.Console({
            format: winston.format.colorize({ all: true }),
        }),
        new winston.transports.File({ filename: "error.log", level: "error" })
    ],
    exceptionHandlers: [new winston.transports.File({ filename: "exceptions.log" })],
});
//routes
app.use("/api/movies", PeliculasRoute);


//start server
app.listen(PORT, () => {
    // console.log("Server stated on Port: ", PORT);
    logger.warn(`Server started at PORT ${PORT}`);
});