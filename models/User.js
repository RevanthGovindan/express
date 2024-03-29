var mongoose = require('mongoose');
var User = new mongoose.Schema({
    name: String,
    email: String,
    phoneNo: String,
    age: String,
    DOB: String,
    city: String,
    state: String,
    country: String,
    password: String,
    verified: {
        type: Boolean,
        default: false
    }
});

module.exports = mongoose.model('user', User);