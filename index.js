const express = require("express");
const router = require("./router/router.js");
const app = express();
require("./controllers/bot");


app.use(express.urlencoded({extended: true}));
app.use(express.json())
app.use(router);

function start(){

    app.listen(3000);
    console.log("Server started");
}

start();