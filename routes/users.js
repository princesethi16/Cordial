// handle routes after /users
const express = require('express');
const router = express.Router(); 
const passport = require('passport');


const userController = require('../controllers/users_controllers');

// upto the feed of user section
router.get('/feed', passport.checkAuthentication,userController.feed);

router.get('/sign-out',userController.destroySession);

// Further route from the users
// router.use()
// for posts of feed loaded**********

router.use('/feed/profile',require('./profile'));
router.use('/feed/post',require('./newPost'));

module.exports = router; //used by the home route file