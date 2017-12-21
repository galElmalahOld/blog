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
    static delete(id, cb) {
        Posts.findByIdAndRemove(id, cb)
    }
}

module.exports = {
    PostsC
}