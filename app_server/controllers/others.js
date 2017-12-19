
let mongoose = require('mongoose');
let Posts = mongoose.model('Post');


let sendJSONresponse = (res, status, content) => {
    res.status(status);
    res.json(content);
};

let aboutPage = (req, res) => {
    res.render('aboutPage',{title:'Gal\'s blog'})
};

let adminArea = (req, res) => {
    res.render('adminArea',{title:'Gal\'s blog'})
};




let logIn = (req, res) => {
    res.render('adminLogin',{title:'Gal\'s blog'})
}
module.exports = {
    aboutPage,
    adminArea,
    logIn
}