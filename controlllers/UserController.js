const User = require('../models/User');
const errHandler = require('../helpers/Errorhandler');
const Response = require('../helpers/Response');
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

module.exports.login = (request, res) => {

    User.findOne({ email: request.body.email, password: request.body.password }, (err, result) => {
        try {
            if (err) throw err;
            if (result === null) {
                throw new Error("Invalid credentials")
            } else {
                const response = new Response();
                const data = { accountDetails : result }
                response.setData(data);
                res.send(response.getResponse());
            }
        } catch (error) {
            error.code = 401;
            errHandler.Errorhandler(error, request, res);
        }
    });

}