const User = require('../models/User');

module.exports.getUsers = (request, response) => {
    User.find((err, result) => {
        if (err) throw err;
        response.send(result);
    });
}

module.exports.addUser = (request, response) => {
    User.create(request.body, (err, result) => {
        if (err) throw err;
        response.send(JSON.stringify({ success: true }));
    });
}

module.exports.updatePassword = (request, response) => {

    User.updateOne({ id: request.body.id }, { password: request.body.password }, (err, result) => {
        if (err) throw err;
        response.send(JSON.stringify({ success: true }));
    });
}

module.exports.login = (request, response) => {
    User.findOne({ email: request.body.id, password: request.body.id }, (err, result) => {
        if (err) throw err;
        response.send(JSON.stringify({ success: true }));
    });
}