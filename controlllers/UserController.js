const User = require('../models/User');


module.exports.addUser = (request, response) => {

    User.create(request.body, (err, result) => {
        if (err) throw err;
        response.send(JSON.stringify({ success: true }));
    });
    User.updateOne({ id: request.body.id })
}

module.exports.updatePassword = (request, response) => {

    User.updateOne({ id: request.body.id }, { password: request.body.password },(err, result)=>{
        if (err) throw err;
        response.send(JSON.stringify({ success: true }));
    })
}

module.exports.login = (request, response) => {
    console.log(request)
}