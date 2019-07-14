const db = require('./db');
const log = require('./helpers/log4j').logger;
module.exports.cors = (req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
    next();
}

module.exports.intercept = (req, res, next) => {
    log.debug(req.body);
    next();
}