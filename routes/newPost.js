const express = require('express');
const router = express.Router(); 
const passport = require('passport')
const newPostController = require('../controllers/newPostController');

router.post('/',passport.checkAuthentication,newPostController.newPost);

router.post('/post-comment',passport.checkAuthentication,newPostController.newComment);


module.exports = router;