const { logEvents } = require('./logEvents');

const errorHandler = (err, req, res, next) => {
    console.log('hendling errors');
    console.error(err.stack);
   res.status(500).send(err.message);
   logEvents(err.name + ': ' + err.message, 'errorLog.txt');
   next();
}

module.exports = errorHandler;