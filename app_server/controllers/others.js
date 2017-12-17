
let sendJSONresponse = (res, status, content) => {
    res.status(status);
    res.json(content);
};

let aboutPage = (req, res) => {
    res.render('aboutPage',{title:'Gal\'s blog'})
};
module.exports = {
    aboutPage
}