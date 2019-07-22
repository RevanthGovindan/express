var mongoose = require('mongoose');

var otp = new mongoose.Schema({
    user_id: String,
    otp_number: String,
    user_mail: String,
    createdAt: {
        type: Date,
        expires: 180,
        default: Date.now
    }
});


module.exports = mongoose.model('otp', otp);