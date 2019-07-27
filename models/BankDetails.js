var mongoose = require('mongoose');

var BankDetails = new mongoose.Schema({
    user_id: String,
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
        ifsc: String,
        balance: {
            type: String,
            default: "1000"
        }
    }],
    availablefunds: {
        type: String,
        default: '1000'
    }
});

module.exports = mongoose.model('bankdetails', BankDetails);