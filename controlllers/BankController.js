const Bank = require('../models/BankDetails');
const Response = require('../helpers/Response');
const constant = require('../common/constants');
const errHandler = require('../helpers/Errorhandler');

module.exports.addBank = (req, httpResponse) => {
    let body = request.body;
    Bank.findOneAndUpdate({ user_id: body.userId }, { $push: { availablebanks: body.bank } }, (err, result) => {
        try {
            if (err) throw err;
            if (result) {
                const data = {};
                const response = new Response();
                response.setInfoId(constant.infoId.CREATED);
                response.setInfoMsg('Bank Added');
                response.setData(data);
                httpResponse.status(201);
                response.sendResponse(httpResponse);
            } else {
                throw new Error("Failed");
            }
        } catch (error) {
            errHandler.Errorhandler(error, request, httpResponse);
        }

    });
};

module.exports.fetchBanks = (request, httpResponse) => {
    let body = request.params;
    try {
        Bank.findOne({ user_id: body.userId }, (err, result) => {
            try {
                if (err) throw err;
                if (result) {
                    const data = { availablebanks: result };
                    const response = new Response();
                    response.setInfoId(constant.infoId.SUCCESS);
                    response.setInfoMsg('Banks fetched');
                    response.setData(data);
                    httpResponse.status(200);
                    response.sendResponse(httpResponse);
                } else {
                    throw new Error("No banks available");
                }
            } catch (error) {
                errHandler.Errorhandler(error, request, httpResponse);
            }
        });
    } catch (error) {
        errHandler.Errorhandler(error, request, httpResponse);
    }
}