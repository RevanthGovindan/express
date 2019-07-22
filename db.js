var mongoose = require('mongoose');


//let url = process.env.MONGODB_URI || 'mongodb://localhost:27017/fundtransfer';
let url = process.env.MONGODB_URI || 'mongodb+srv://revanth:revanth@cluster0-0z6qm.mongodb.net/test?retryWrites=true&w=majority';
mongoose.Promise = global.Promise;
//mongoose.set('debug',true);
mongoose.set('useCreateIndex', true);
mongoose.connect(url ,{ useNewUrlParser: true, useFindAndModify: false })
    .then(db => console.log('db connected'))
    .catch(err => console.log(err));
