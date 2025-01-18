const allowedOrigins = require('../config/allowedOrigins');

const credentials = (req, res, next) => {
    if (allowedOrigins.includes(req.headers.origin)) {
        res.header('Access-Control-allow-Credentials', true)
    };
    next();
}

module.exports = credentials;  