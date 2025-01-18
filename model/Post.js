const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const postSchema = new Schema({
    id: Number,
    title: String,
    dateTime: String,
    postBody: String,
    likes: {
        type: Number,
        default: 0
    },
    disLikes: {
        type: Number,
        default: 0
    },
    comments: {
        type: Array,
        default: []
    }
        
})

module.exports = mongoose.model('Post', postSchema);