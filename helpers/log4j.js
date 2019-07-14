var log4js = require('log4js');

log4js.configure({
    appenders: { data: { type: 'file', filename: 'data.log' } },
    categories: { default: { appenders: ['data'], level: 'debug' } }
});
const logger = log4js.getLogger('data');
module.exports.logger = logger;