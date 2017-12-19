var express = require('express');
var router = express.Router();

let ctrlBlog = require('../controllers/blog')
let ctrlOthers = require('../controllers/others')


/* Main blog page */
router.get('/', ctrlBlog.mainBlog);
router.get('/posts/:postid', ctrlBlog.readOne);
router.post('/post', ctrlBlog.createPost);

/* Admin area */
router.get('/login/admin', ctrlOthers.adminArea);
router.get('/login', ctrlOthers.logIn)
/* About page */
router.get('/about', ctrlOthers.aboutPage)

module.exports = router;