const mongoose = require('mongoose');
const Posts = mongoose.model('Post');


class PostsC {
    static all(cb) {
        Posts.find().exec(cb);
    }
    static find(id ,cb) {
        Posts.findById(id).exec(cb);
    }
    static create(post ,cb) {
        Posts.create(post, cb)
    }
}

module.exports = {
    PostsC
}