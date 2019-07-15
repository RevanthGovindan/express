const  constants = require('../common/constants');
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
    res.status(code).json({ response: response });
}