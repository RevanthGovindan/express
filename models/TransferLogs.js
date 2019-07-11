var mongoose = require('mongoose');
const uuid = require('uuid/v4');

var TransferLogs = new mongoose.Schema({
    uuid: uuid(),
    amount : Number,
    transferAt : Date,
    status : String,
    bank : Object
});

module.exports = mongoose.model('transferlogs', TransferLogs);