const express = require('express');
const mongo = require('mongoose');
require('dotenv').config();
const app = express();
const booksRoute = require('./routes/books');

const PORT = process.env.PORT || 3000;


//connnect to mongodb atlas
mongo.connect(
    process.env.MONGO_URL, { useNewUrlParser: true }
).then(() => {
    console.log("Connect to mongodb Atlas");
}).catch(error => {
    console.log("Something wrong error", error)
});
//middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
//routes
app.use('/api/books', booksRoute);

//start server
app.listen(PORT, () => {
        console.log("Server stated on Port: ", PORT);
    }

)