const express = require("express");
const bodyParser = require('body-parser');
const server = express();
const port = 8000;
//const app = require("./app");
const router = require("./routes/router");

server.use(bodyParser.urlencoded({ extended: false }));
server.use(bodyParser.json());

server.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
    next();
});

//server.use("/",app);


server.use("/", router);

server.listen(port, () => {
    console.log('Server is up and running on port numner ' + port);
});