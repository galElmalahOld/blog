var express = require('express');
var router = express.Router();

let ctrlBlog = require('../controllers/blog')
let ctrlOthers = require('../controllers/others')


/* Main blog page */
router.get('/', ctrlBlog.mainBlog);
router.get('/posts/:postid', ctrlBlog.readOne);
/* Admin area */
router.get('/admin', ctrlBlog.adminArea);
router.post('/admin', ctrlBlog.createPost);
/* About page */
router.get('/about', ctrlOthers.aboutPage)

module.exports = router;