var mongoose = require('mongoose');
const User = require('./User');

var TransferLogs = new mongoose.Schema({
    transferedBy: String,
    action: String,
    amount: String,
    transferAt: {
        type: Date,
        default: new Date
    },
    status: String,
    bank: {
        bankName: String,
        ifsc: String,
        paymentMode: String
    }
});

module.exports = mongoose.model('transferlogs', TransferLogs);