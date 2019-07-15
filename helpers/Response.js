const log = require('../helpers/log4j').logger;
function Response() {
    this.data = {};
    this.infoId = null;
    this.infoMsg = '';
}

Response.prototype.setData = (data) => {
    this.data = data;
}

Response.prototype.setInfoId = (infoId) => {
    this.infoId = infoId;
}

Response.prototype.setInfoMsg = (infoMsg) => {
    this.infoMsg = infoMsg;
}

Response.prototype.sendResponse = (httpRes) => {
    if (!this.infoId) {
        this.infoId = '001';
    }
    let response = {
        data: this.data,
        infoId: this.infoId,
        infoMsg: this.infoMsg
    };
    log.debug(response);
    httpRes.send(response);
}

module.exports = Response;