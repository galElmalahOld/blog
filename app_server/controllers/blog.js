
const db = require('../models/functions')
const Posts = db.PostsC;

let sendJSONresponse = (res, status, content) => {
    res.status(status);
    res.json(content);
};

let mainBlog = (req, res) => {
    Posts.all((err, post) => {
        if (!post) {
            sendJSONresponse(res, 404, {
                "message": "No posts"
            });
            return;
        } else if (err) {
            sendJSONresponse(res, 400, err);
            return;
        } else {
            res.render('mainBlogArea', {
                title: 'Gal\'s blog',
                posts: post
            });
        }
    });
};

let readOne = (req, res) => {
    const id = req.params.postid
    Posts.find(id ,(err, post) => {
        res.render('posts', {
            title:'Gal\'s blog',
            post: post
        });
    });
};

let createPost = (req, res) => {
    if(req.body.title&&req.body.content){
        const post = {
            title: req.body.title,
            content:req.body.content
        }
        Posts.create(post, (err, post) => {
            if(err){
                sendJSONresponse(res, 400, err)
            } else {
                sendJSONresponse(res, 201, post)            
            }
        })
    }
};


module.exports = {
    mainBlog,
    readOne,
    createPost
};