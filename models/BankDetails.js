var mongoose = require('mongoose');
const uuid = require('uuid/v4');

var BankDetails = new mongoose.Schema({
    uuid: uuid(),
    availablebanks: Array,
    availablefunds: Number
});

module.exports = mongoose.model('bankdetails', BankDetails);