const User = require('../models/User');
const errHandler = require('../helpers/Errorhandler');
const Response = require('../helpers/Response');
const constant = require('../common/constants');

module.exports.getUsers = (request, response) => {
    User.find((err, result) => {
        if (err) throw err;
        response.send(result);
    });
}

module.exports.addUser = (request, httpResponse) => {
    let body = request.body;
    User.findOne({ email: body.email }, (err, result) => {
        try {
            if (err) throw err;
            if (result) {
                throw new Error("Email exists");
            } else {
                User.create(body, (err, result) => {
                    try {
                        if (err) throw err;
                        const response = new Response();
                        const data = { accountDetails: result };
                        response.setInfoMsg('User Created');
                        response.setData(data);
                        httpResponse.status(201);
                        response.sendResponse(httpResponse);
                    } catch (error) {
                        error.code = 500;
                        errHandler.Errorhandler(error, request, httpResponse);
                    }
                });
            }
        } catch (error) {
            error.code = 409;
            errHandler.Errorhandler(error, request, httpResponse);
        }
    });
}

module.exports.updatePassword = (request, httpResponse) => {
    User.updateOne({ id: request.body.id }, { password: request.body.password }, (err, result) => {
        try {
            if (err) throw err;
            if (result.nModified === 1) {
                const response = new Response();
                response.setInfoMsg('User Created');
                httpResponse.status(200);
                response.sendResponse(httpResponse);
            } else {
                throw new Error("Update Failed")
            }
        } catch (error) {
            error.code = 200;
            errHandler.Errorhandler(error, request, httpResponse);
        }
    });
}

module.exports.login = (request, httpRes) => {

    User.findOne({ email: request.body.email, password: request.body.password }, (err, result) => {
        try {
            if (err) throw err;
            if (result === null) {
                throw new Error("Invalid credentials")
            } else {
                const response = new Response();
                const data = { accountDetails: result };
                httpRes.status(200);
                response.setInfoId(constant.infoId.UNAUTHORIZED);
                response.setData(data);
                response.sendResponse(httpRes);
            }
        } catch (error) {
            error.code = 401;
            errHandler.Errorhandler(error, request, httpRes);
        }
    });

}