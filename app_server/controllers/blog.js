
let sendJSONresponse = (res, status, content) => {
    res.status(status);
    res.json(content);
};


let mainBlog = (req, res) => {
    res.render('mainBlogArea',{
        title: 'Gal\'s blog',
        post:{
            name:"Ubuntu opinion"
        }
    });
};

let adminArea = (req, res) => {
    res.render('adminArea',{title:'Gal\'s blog'})
};

let createPost = (req, res) => {
    console.log("create a post");
}

let readOne = (req, res) => {
    sendJSONresponse(res, 200, {"message":"blabla"});
}


module.exports = {
    mainBlog,
    adminArea,
    createPost,
    readOne
};