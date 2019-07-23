var mongoose = require('mongoose');

var BankDetails = new mongoose.Schema({
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