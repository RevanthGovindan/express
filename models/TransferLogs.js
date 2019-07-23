var mongoose = require('mongoose');
const User = require('./User');

var TransferLogs = new mongoose.Schema({
    transferedBy: User._id,
    amount: Number,
    transferAt: Date,
    status: String,
    bank: {
        bankName: String,
        ifsc: String,
        paymentMode: String
    }
});

module.exports = mongoose.model('transferlogs', TransferLogs);