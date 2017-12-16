
let mainBlog = (req, res) => {
    res.render('index',{
        title: 'gals blog'
    });
};

module.exports = {
    mainBlog
};