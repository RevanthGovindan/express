function Response() {
    this.data = {};
    this.success = true;
    this.infoId = '001';
}

Response.prototype.setData = (data) => {
    this.data = data;
}

Response.prototype.setSuccess = (result) => {
    this.success = result;
}

Response.prototype.setInfoId = (infoId) => {
    this.setInfoId = infoId;
}

Response.prototype.getResponse = () => {
    let response = {
        success: this.success,
        data: this.data,
        infoId: this.infoId
    };
    return response;
}

module.exports = Response;