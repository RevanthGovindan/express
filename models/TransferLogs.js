var mongoose = require('mongoose');
const User = require('./User');
const uuid = require('uuid/v4');

var TransferLogs = new mongoose.Schema({
    uuid: { type: String, default: uuid() },
    transferedBy: User.uuid,
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