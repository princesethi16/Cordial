// handle routes after /users
const express = require('express');
const router = express.Router(); 
const passport = require('passport');
const customMiddleware = require('../config/customMiddleware');
const userController = require('../controllers/users_controllers');
var signInUpController = require('../controllers/signInUp_controller');

// upto the feed of user section
router.get('/feed', passport.checkAuthentication,userController.feed);

router.get('/sign-out',userController.destroySession);

// Further route from the users
// router.use()
// for posts of feed loaded**********

router.use('/profile',require('./profile'));
router.use('/feed/post',require('./post'));



module.exports = router; //used by the home route file