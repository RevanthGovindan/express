var mongoose = require('mongoose');

var BankDetails = new mongoose.Schema({
    user_id : String,
    availablebanks: [{
        _id: false,
        bankName: String,
        payInOptions: [{
            _id: false,
            gateway: String,
            url: String
        }],
        accountNumber: String,
        accountType: String,
        ifsc: String
    }],
    availablefunds: Number
});

module.exports = mongoose.model('bankdetails', BankDetails);