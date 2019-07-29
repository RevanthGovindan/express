var mongoose = require('mongoose');

var Session = new mongoose.Schema({
    user_id: String,
    createdAt: {
        type: Date,
        default: new Date
    }
});

module.exports = mongoose.model('session', Session);