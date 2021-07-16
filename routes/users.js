// handle routes after /users
const express = require('express');
const passport = require('passport');

const router = express.Router(); 

const userController = require('../controllers/users_controllers');

// upto the profile of user section
router.get('/profile',userController.profile);

// Further route from the users
// router.use()
// for posts of profile loaded**********

router.use('/profile/posts', require('./posts'));

router.post('/create', userController.create);


// use passport as middleware to authenticate user at the router level
router.post('/create-session',passport.authenticate(
    'local',
    {failureRedirect: '/authentication/sign-in'}
),userController.createSession);

module.exports = router; //used by the home route file