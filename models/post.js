const mongoose = require('mongoose');

//Here we are defining our post model
const postSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    title: String,
    body: String
});

module.exports = mongoose.model('Post', postSchema);
