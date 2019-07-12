var mongoose = require('mongoose');


let url = process.env.MONGODB_URI || 'mongodb://localhost:27017/fundtransfer';

mongoose.Promise = global.Promise;
//mongoose.set('debug',true);

mongoose.connect(url ,{ useNewUrlParser: true, useFindAndModify: false })
    .then(db => console.log('db connected'))
    .catch(err => console.log(err));