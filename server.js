const constants = require("./common/constants").config;
const express = require("express");
const bodyParser = require('body-parser');
const server = express();
const port = constants.PORT;
const app = require("./app");
const router = require("./routes/router");
var swaggerUi = require('swagger-ui-express');
var swaggerDocument = require('./swagger.json');

server.use(bodyParser.urlencoded({ extended: false }));
server.use(bodyParser.json());


server.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
server.use("/", router);

server.listen(port, () => {
    console.log('Server is up and running on port numner ' + port);
});