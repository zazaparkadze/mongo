const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const itemsSchema = new Schema({
    id: {
        type: Number,
        required: true,
    },
    checked: {
        type: Boolean,
        default: false,
    },
    item: {
        type: String,
        required: true
    }
})

module.exports = mongoose.model('Item', itemsSchema);