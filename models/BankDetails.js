var mongoose = require('mongoose');
const uuid = require('uuid/v4');

var BankDetails = new mongoose.Schema({
    _id: { type: String, default: uuid() },
    availablebanks: [{
        bankName: String,
        payInOptions: [{
            gateway: String,
            url: String
        }],
        accountNumber: String,
        accountType: String,
        ifsc:String
    }],
    availablefunds: Number
});

module.exports = mongoose.model('bankdetails', BankDetails);