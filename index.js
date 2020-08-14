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
app.use("/api/peliculas", PeliculasRoute);


//start server
app.listen(PORT, () => {
    // console.log("Server stated on Port: ", PORT);
    logger.warn(`Server started at PORT ${PORT}`);
});