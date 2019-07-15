const constants = require('../common/constants');
const log = require('../helpers/log4j').logger;
module.exports.Errorhandler = (err, req, res) => {
    let message = '';
    let code = 500;
    let infoId = constants.infoId.UNAUTHORIZED;
    if (err.message) {
        message = err.message;
    } else {
        message = 'error occured';
    }
    if (err.code) {
        code = err.code;
    }
    if (err.infoId) {
        infoId = err.infoId;
    }
    let response = {
        infoId: infoId,
        success: false,
        data: {
            error: {
                message: message
            }
        }
    }
    log.error(response)
    res.status(code).json({ response: response });
}