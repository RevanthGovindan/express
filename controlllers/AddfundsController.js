const Bank = require('../models/BankDetails');
const Response = require('../helpers/Response');
const constant = require('../common/constants');
const errHandler = require('../helpers/Errorhandler');

module.exports.addFunds = (request, httpResponse) => {
    let requestBody = request.body;
    Bank.findOne({ user_id: requestBody.userId }, (err, result) => {
        try {
            if (err) throw err;
            if (result) {
                let availableFunds = parseFloat(result.availablefunds);
                let availableBanks = result.availablebanks.map((bank) => {
                    if (bank.bankName === requestBody.bankName) {
                        let balance = parseFloat(bank.balance);
                        let amount = parseFloat(requestBody.amount);
                        if (balance < amount) {
                            throw new Error("Amount entered greater than available balance");
                        } else {
                            availableFunds += amount;
                            balance -= amount;
                        }
                        bank.balance = balance;
                        return bank;
                    } else {
                        return bank;
                    }
                });
                Bank.findOneAndUpdate({ user_id: requestBody.userId }, { availablefunds: availableFunds, availablebanks: availableBanks }, (err, result) => {
                    try {
                        if (err) throw err;
                        if ((result)) {
                            const data = { amountAdded: true };
                            const response = new Response();
                            response.setInfoId(constant.infoId.SUCCESS);
                            response.setInfoMsg('Fund Added');
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
            }
        } catch (error) {
            errHandler.Errorhandler(error, request, httpResponse);
        }
    })
}