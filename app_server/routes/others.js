
let mongoose = require('mongoose');
let Posts = mongoose.model('Post');


let sendJSONresponse = (res, status, content) => {
    res.status(status);
    res.json(content);
};

let aboutPage = (req, res) => {
    res.render('aboutPage',{
        title:'Gal\'s blog',
        locals: res.locals
    })
};


module.exports = {
    aboutPage
}