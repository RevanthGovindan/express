const User = require('../models/User');
const errHandler = require('../helpers/Errorhandler');
const Response = require('../helpers/Response');
const constant = require('../common/constants');
const otpModel = require('../models/Otp');
const commonHelper = require('../helpers/common');
const sendMailer = require('../helpers/mailsender');

module.exports.getUsers = (request, response) => {
    User.find((err, result) => {
        if (err) throw err;
        response.send(result);
    });
}

module.exports.getUserId = (request, httpResponse) => {
    let email = request.params.email;
    console.log(email)
    User.findOne({ email: email }, (err, result) => {
        try {
            if (err) throw err;
            const response = new Response();
            console.log(result)
            const data = { userId : result._id };
            response.setInfoId(constant.infoId.SUCCESS);
            response.setInfoMsg('User id');
            response.setData(data);
            httpResponse.status(200);
            response.sendResponse(httpResponse);
        } catch (error) {
            errHandler.Errorhandler(error, request, httpResponse);
        }
    });
}

module.exports.addUser = (request, httpResponse) => {
    let body = request.body;
    User.findOne({ email: body.email }, (err, result) => {
        try {
            if (err) throw err;
            if (result && result.verified && result && result.password) {
                throw new Error("User exists");
            } else if (result && result.verified) {
                const response = new Response();
                const data = { accountDetails: result, navigateTo: constant.screens.UPDATE_PASSWORD };
                response.setInfoId(constant.infoId.REDIRECT);
                response.setInfoMsg('User verified but password is not set');
                response.setData(data);
                httpResponse.status(200);
                response.sendResponse(httpResponse);
            } else if (result) {
                const response = new Response();
                const data = { accountDetails: result, navigateTo: constant.screens.VERIFY_ACCOUNT };
                response.setInfoId(constant.infoId.REDIRECT);
                response.setInfoMsg('User Created but not verified');
                response.setData(data);
                httpResponse.status(200);
                response.sendResponse(httpResponse);
            } else {
                User.create(body, (err, result) => {
                    try {
                        if (err) throw err;
                        const response = new Response();
                        const data = { accountDetails: result };
                        response.setInfoId(constant.infoId.SUCCESS);
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
    User.updateOne({ _id: request.body.id }, { password: request.body.password }, (err, result) => {
        try {
            if (err) throw err;
            if (result.nModified === 1) {
                const response = new Response();
                response.setInfoId(constant.infoId.SUCCESS);
                response.setInfoMsg('Password Updated');
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
                response.setInfoMsg("Login success");
                response.sendResponse(httpRes);
            }
        } catch (error) {
            error.code = 401;
            errHandler.Errorhandler(error, request, httpRes);
        }
    });
}

module.exports.generateOTP = (request, httpRes) => {
    let requestData = request.body;
    User.findOne({ email: requestData.userMail }, (err, result) => {
        try {
            if (err) throw err;
            if (result === null) {
                throw new Error("Invalid User");
            } else {
                let otpNumber = commonHelper.randomNumber();
                let emailData = { email: requestData.userMail, value: `Your one time password to create account is ${otpNumber}, it will be expired soon.` };
                var otpMail = new Promise((resolve, reject) => {
                    sendMailer(emailData, resolve, reject);
                });
                otpMail.then((message) => {
                    otpModel.create({ user_id: requestData.userId, otp_number: otpNumber, user_mail: requestData.userMail }, (err, result) => {
                        try {
                            if (err) throw err;
                            let responseData = { isEmailSent: true };
                            const response = new Response();
                            httpRes.status(200);
                            response.setInfoId(constant.infoId.SUCCESS);
                            response.setInfoMsg("OTP has been sent");
                            response.setData(responseData);
                            response.sendResponse(httpRes);
                        } catch (error) {
                            errHandler.Errorhandler(error, request, httpRes);
                        }
                    });
                }).catch((error) => {
                    errHandler.Errorhandler(error, request, httpRes);
                });
            }
        } catch (error) {
            errHandler.Errorhandler(error, request, httpRes);
        }
    });
};

module.exports.verifyOtp = (request, httpRes) => {
    let requestData = request.body;
    otpModel.findOne({ user_mail: requestData.userEmail, user_id: requestData.userId, otp_number: requestData.otpEntered }, (err, result) => {
        try {
            if (err) throw err;
            if (result === null) {
                throw new Error("Invalid OTP")
            } else {
                User.updateOne({ _id: requestData.userId }, { verified: true }, (err, result) => {
                    try {
                        if (err) throw err;
                        if (result.nModified === 1 || requestData.isForgotPassword === true) {
                            let responseData = { otpVerified: true, isUserRegistered: true };
                            const response = new Response();
                            httpRes.status(202);
                            response.setInfoId(constant.infoId.SUCCESS);
                            response.setData(responseData);
                            response.setInfoMsg("OTP has been verified");
                            response.sendResponse(httpRes);
                        } else {
                            throw new Error("User has been already verified");
                        }
                    } catch (error) {
                        errHandler.Errorhandler(error, request, httpRes);
                    }
                });
            }
        } catch (error) {
            error.code = 401;
            errHandler.Errorhandler(error, request, httpRes);
        }
    });
}