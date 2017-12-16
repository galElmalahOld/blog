var express = require('express');
var router = express.Router();

let ctrlBlog = require('../controllers/blog')
/* Main blog page */
router.get('/', ctrlBlog.mainBlog);

module.exports = router;
