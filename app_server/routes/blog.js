
const db = require('../models/functions')
const Posts = db.PostsC;
const User = require('../models/user');

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
                posts: post,
                locals: res.locals
            });
        }
    });
};

let readOne = (req, res) => {
    const id = req.params.postid
    Posts.find(id ,(err, post) => {
        // post.content.replace("<img", "<img class=\"responsive-img\"");
        // console.log(post.content);
        res.render('posts', {
            title:'Gal\'s blog',
            post: post,
            locals: res.locals
        });
    });
};

let createPost = (req, res) => {
    if(req.session.admin){
        if(req.body.title && req.body.content){
            // const regex = /\b<img/;
            // req.body.content.replace(regex, "img class=\"responsive-img\"");
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
    } else {
        res.redirect('back');
    }
};

let deleteOne = (req, res, next) => {
    const id = req.params.postid;
    console.log(id);
    Posts.delete(id, (err, post) => {
        if(err){
            next(err)
        } else {
            res.redirect('/')
        }
    } );
}

const createComment = (req, res, next) => {
    const id  =  req.params.postid;

    if(req.body.comment && req.session.uid){
        Posts.find(id, (err, post) => {
            if (err) return next(err)
            // the post has been found
            User.findById(req.session.uid, (err, user) => {
                if (err) return next(err);
                console.log(post.comments);
                //create new comment
                post.comments.push({
                    name:user.name,
                    comment:req.body.comment,
                    createdOn: Date.now()
                });
                //save the comments
                post.save(err => {
                    if(err) return next(err);
                });
            })            

        });
    } else {
        sendJSONresponse(res, 400, err)
    }
}


module.exports = {
    mainBlog,
    readOne,
    createPost,
    deleteOne,
    createComment
};