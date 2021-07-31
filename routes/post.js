const express = require('express');
const router = express.Router(); 
const passport = require('passport')
const postController = require('../controllers/postController');
const likeController = require('../controllers/likeController');

router.post('/',passport.checkAuthentication,postController.newPost);

router.post('/post-comment',passport.checkAuthentication,postController.newComment);

router.get('/delete-post/:id',passport.checkAuthentication,postController.deletePost);

router.get('/delete-comment/:postId/:commentId',passport.checkAuthentication,postController.deleteComment);

router.post('/toggle-like', passport.checkAuthentication,likeController.toggleLike);


module.exports = router;