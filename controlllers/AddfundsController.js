const Bank = require('../models/BankDetails');
const TransferLog = require('../models/TransferLogs');
const Response = require('../helpers/Response');
const constant = require('../common/constants');
const errHandler = require('../helpers/Errorhandler');
const log = require('../helpers/log4j').logger;

module.exports.addFunds = (request, httpResponse) => {
    let requestBody = request.body;
    let transferLog = {};
    Bank.findOne({ user_id: requestBody.userId }, (err, result) => {
        try {
            if (err) throw err;
            if (result) {
                transferLog.transferedBy = requestBody.userId;
                transferLog.action = constant.transferActions.PAYIN;
                transferLog.amount = requestBody.amount;
                transferLog.transferAt = new Date;
                let isUpdated = false;
                let availableFunds = parseFloat(result.availablefunds);
                let availableBanks = result.availablebanks.map((bank) => {
                    if (bank.bankName === requestBody.bankName) {
                        let balance = parseFloat(bank.balance);
                        let amount = parseFloat(requestBody.amount);
                        if (balance < amount) {
                            throw new Error("Amount entered greater than available balance");
                        } else {
                            isUpdated = true;
                            availableFunds += amount;
                            balance -= amount;
                        }
                        bank.balance = balance.toString();
                        let bankData = {
                            bankName: bank.bankName,
                            ifsc: bank.ifsc,
                            paymentMode: requestBody.paymentMode
                        };
                        transferLog.bank = bankData;
                        return bank;
                    } else {
                        return bank;
                    }
                });
                if (isUpdated) {
                    Bank.findOneAndUpdate({ user_id: requestBody.userId }, { availablefunds: availableFunds, availablebanks: availableBanks }, (err, result) => {
                        try {
                            if (err) throw err;
                            if ((result)) {
                                transferLog.status = constant.transferStatus.TRANSFERED;
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
                            transferLog.status = constant.transferStatus.FAILED;
                            errHandler.Errorhandler(error, request, httpResponse);
                        } finally {
                            TransferLog.create(transferLog, (err, result) => {
                                try {
                                    if (err) throw err;
                                } catch (error) {
                                    log.error(error);
                                }
                            });
                        }
                    });
                } else {
                    throw new Error("Bank not Available");
                }
            }
        } catch (error) {
            errHandler.Errorhandler(error, request, httpResponse);
        }
    })
}