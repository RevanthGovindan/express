module.exports.config = {
    PORT: 8000
}

module.exports.infoId = {
    SUCCESS: "001",
    CREATED: "002",
    INPROGRESS: "003",
    NODATA: "004",
    UPDATEFAILED: "005",
    SESSIONEXPRED: "006",
    NAVIGATE: "007",
    REDIRECT: "008"
}


module.exports.screens = {
    LOGIN: 1.1,
    SIGNUP: 1.2,
    VERIFY_ACCOUNT: 1.3,
    UPDATE_PASSWORD: 1.4,
    ADD_FUNDS: 2,
    WITHDRAW_FUNDS: 3,
    PENDING_LOGS: 4,
    TRANSFER_LOGS: 5
}

module.exports.otpFromKeys = {
    SIGNUP: "signup",
    FORGOTPASSWORD: "forgotpassword"
}

module.exports.transferStatus = {
    PENDING: "pending",
    TRANSFERED: "transfered",
    FAILED: "failed"
}

module.exports.transferActions = {
    PAYIN: "payin",
    PAYOUT: "payout"
}