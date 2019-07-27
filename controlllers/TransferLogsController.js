const Bank = require('../models/BankDetails');
const TransferLog = require('../models/TransferLogs');
const Response = require('../helpers/Response');
const constant = require('../common/constants');
const errHandler = require('../helpers/Errorhandler');


module.exports.pendingLogs = (request, httpResponse) => {
    let userId = request.params.userId;
    TransferLog.find({ transferedBy: userId }, (err, result) => {
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
                if(logs.length > 0){
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
    TransferLog.find({ transferedBy: userId }, (err, result) => {
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
};

module.exports.cancelPayment = (request, httpResponse) => {


};