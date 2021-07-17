// handle routes after /users
const express = require('express');
const passport = require('passport');

const router = express.Router(); 

const userController = require('../controllers/users_controllers');

// upto the feed of user section
router.get('/feed', passport.checkAuthentication,userController.feed);

// Further route from the users
// router.use()
// for posts of feed loaded**********

router.use('/feed/profile',require('./profile'));


module.exports = router; //used by the home route file