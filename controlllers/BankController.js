const Bank = require('../models/BankDetails');
const Response = require('../helpers/Response');
const constant = require('../common/constants');

module.exports.addBank = (req, httpResponse) => {
    let body = req.body;
    Bank.findOneAndUpdate({ user_id: body.userId }, { $push: { availablebanks: body.bank } }, (err, result) => {
        if (err) throw err;
        if (result) {
            const data = {};
            const response = new Response();
            response.setInfoId(constant.infoId.CREATED);
            response.setInfoMsg('Bank Added');
            response.setData(data);
            httpResponse.status(201);
            response.sendResponse(httpResponse);
        }
    });
};

module.exports.fetchBanks = (userId) => {
    var banks = [];
    try {
        Bank.findOne({ user_id: userId }, (err, result) => {
            if (err) throw err;
            if(result){
                banks = result.availablebanks;
            }
        });
        console.log(banks)
        return banks;
    } catch (error) {
        return false;
    }
}