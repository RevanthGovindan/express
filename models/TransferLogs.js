var mongoose = require('mongoose');
const uuid = require('uuid/v4');

var TransferLogs = new mongoose.Schema({
    uuid: uuid(),
    availablebanks: Array,
    availablefunds: Number
});

module.exports = mongoose.model('transferlogs', TransferLogs);