const Bank = require('../models/BankDetails');
const Response = require('../helpers/Response');
const constant = require('../common/constants');
const errHandler = require('../helpers/Errorhandler');

module.exports.withdrawfunds = (request, httpResponse) => {
    let requestBody = request.body;
    Bank.findOne({ user_id: requestBody.userId }, (err, result) => {
        try {
            if (err) throw err;
            if (result) {
                let isUpdated = false;
                let availableFunds = parseFloat(result.availablefunds);
                let availableBanks = result.availablebanks.map((bank) => {
                    if (bank.bankName === requestBody.bankName) {
                        let balance = parseFloat(bank.balance);
                        let amount = parseFloat(requestBody.amount);
                        if (amount > availableFunds) {
                            throw new Error("Amount entered greater than available funds");
                        } else {
                            isUpdated = true;
                            availableFunds -= amount;
                            balance += amount;
                        }
                        bank.balance = balance;
                        return bank;
                    } else {
                        return bank;
                    }
                });
                if (isUpdated) {
                    Bank.findOneAndUpdate({ user_id: requestBody.userId }, {
                        availablefunds: availableFunds.toString(),
                        availablebanks: availableBanks
                    }, (err, result) => {
                        try {
                            if (err) throw err;
                            if ((result)) {
                                const data = { amountAdded: true };
                                const response = new Response();
                                response.setInfoId(constant.infoId.SUCCESS);
                                response.setInfoMsg('Fund Withdraw successfull');
                                response.setData(data);
                                httpResponse.status(200);
                                response.sendResponse(httpResponse);
                            } else {
                                throw new Error("Failed");
                            }
                        } catch (error) {
                            errHandler.Errorhandler(error, request, httpResponse);
                        }
                    });
                } else {
                    throw new Error("Bank not Available");
                }
            } else {
                throw new Error("Error Occured");
            }
        } catch (error) {
            errHandler.Errorhandler(error, request, httpResponse);
        }
    });
}


module.exports.testing = (req, response) => {
    let id = req.params.userId;
    Bank.find({ user_id: id, $elemMatch: { availablebanks: { bankName: "idfc" } } }, (err, result) => {
        console.log(err)
        response.send(result);
    });
}