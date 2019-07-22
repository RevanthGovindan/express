var nodemailer = require('nodemailer');

let sendMailer = (optionData, resolve, reject) => {
    var transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'revanth.g@inxsasia.com',
            pass: 'asgyzowhhphihwxd'
        }
    });

    var mailOptions = {
        from: 'revanth.g@inxsasia.com',
        to: optionData.email,
        subject: 'Fund Transfer',
        text: optionData.value
    };

    transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
            console.log('error ' + error);
            reject(error);
        } else {
            console.log('Email sent: ' + info.response);
            resolve(info.response);
        }
    });
};

module.exports = sendMailer;