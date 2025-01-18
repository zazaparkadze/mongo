const mongoose = require('mongoose');
const { logEvents } = require('../middleware/logEvents');


const connDB = async () => {
    try {
        await mongoose.connect(process.env.DATABASE_URI);
    } catch (err) {
        console.log(err);
        logEvents(err.message, "error")
    }
}

module.exports = connDB