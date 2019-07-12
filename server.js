const constants = require("./common/constants").config;
const express = require("express");
const bodyParser = require('body-parser');
const server = express();
const port = constants.PORT;
const app = require("./app");
const router = require("./routes/router");

server.use(bodyParser.urlencoded({ extended: false }));
server.use(bodyParser.json());

//server.use("/",app);

server.use("/", router);

server.listen(port, () => {
    console.log('Server is up and running on port numner ' + port);
});