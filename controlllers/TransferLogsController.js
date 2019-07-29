const Bank = require('../models/BankDetails');
const TransferLog = require('../models/TransferLogs');
const Response = require('../helpers/Response');
const constant = require('../common/constants');
const errHandler = require('../helpers/Errorhandler');


module.exports.pendingLogs = (request, httpResponse) => {
    let userId = request.params.userId;
    TransferLog.find({ transferedBy: userId }).sort({ transferAt: -1 }).exec((err, result) => {
        try {
            if (err) throw err;
            if (result) {
                let logs = result.map((log) => {
                    if (log.status === constant.transferStatus.PENDING) {
                        if (log.action === constant.transferActions.PAYOUT) {
                            log.isCancellable = true;
                        }
                        return log;
                    }
                });
                if (logs.length > 0) {
                    const data = { pendingLogs: logs };
                    const response = new Response();
                    response.setInfoId(constant.infoId.SUCCESS);
                    response.setInfoMsg('Pending Logs');
                    response.setData(data);
                    httpResponse.status(200);
                    response.sendResponse(httpResponse);
                } else {
                    throw new Error("No Data Found");
                }
            } else {
                throw new Error("No Data Found");
            }
        } catch (error) {
            errHandler.Errorhandler(error, request, httpResponse);
        }
    });
};

module.exports.transferLogs = (request, httpResponse) => {
    let userId = request.params.userId;
    TransferLog.find({ transferedBy: userId }).sort({ transferAt: -1 }).exec((err, result) => {
        try {
            if (err) throw err;
            if (result && result.length > 0) {
                const data = { transferLogs: result };
                const response = new Response();
                response.setInfoId(constant.infoId.SUCCESS);
                response.setInfoMsg('Transfer Logs');
                response.setData(data);
                httpResponse.status(200);
                response.sendResponse(httpResponse);
            } else {
                throw new Error("No Data Found");
            }
        } catch (error) {
            errHandler.Errorhandler(error, request, httpResponse);
        }
    });
}

module.exports.cancelPayment = (request, httpResponse) => {
    let transactionId = request.body.transactionId;
    try {
        TransferLog.findOne({ _id: transactionId }, (err, transferLogs) => {
            if (err) throw err;
            let amount = parseFloat(transferLogs.amount);
            let bankName = transferLogs.bank.bankName;
            let ifscCode = transferLogs.bank.ifsc;
            Bank.findOne({ user_id: transferLogs.transferedBy }, (err, bankResults) => {
                if (err) throw err;
                let availableFunds = parseFloat(bankResults.availablefunds);
                let availableBanks = bankResults.availablebanks.map((bank) => {
                    if (bank.bankName === bankName && bank.ifsc === ifscCode) {
                        let balance = parseFloat(bank.balance);
                        balance -= amount;
                        availableFunds += amount;
                        bank.balance = balance.toString();
                        return bank;
                    } else {
                        return bank;
                    }
                });
                Bank.updateOne({ user_id: transferLogs.transferedBy }, { availablefunds: availableFunds.toString(), availablebanks: availableBanks }, (err, Updateresult) => {
                    if (err) throw err;
                    if (Updateresult) {
                        TransferLog.updateOne({ _id: transactionId }, { status: constant.transferStatus.CANCELLED }, (err, transferLogs) => {
                            if (err) throw err;
                            if (transferLogs.nModified === 1) {
                                const data = {};
                                const response = new Response();
                                response.setInfoId(constant.infoId.SUCCESS);
                                response.setInfoMsg('Payment Cancelled');
                                response.setData(data);
                                httpResponse.status(200);
                                response.sendResponse(httpResponse);
                            } else {
                                throw new Error('Failed');
                            }
                        });
                    } else {
                        throw new Error('Failed');
                    }
                });
            });
        });
    } catch (error) {
        errHandler.Errorhandler(error, request, httpResponse);
    }
};