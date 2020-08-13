const express = require('express');
const mongo = require('mongoose');
require('dotenv').config();
const app = express();
const PORT = process.env.PORT || 3000;

//connnect to mongodb atlas
mongo.connect(
    process.env.MONGO_URL, { useNewUrlParser: true }
).then(() => {
    console.log("Connect to mongodb Atlas");
}).catch(error => {
    console.log("Something wrong error", error)
});
//start server
app.listen(PORT, () => {
        console.log("Server stated on Port: ", PORT);
    }

)