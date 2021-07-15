// handle routes upto /profile page
const express = require('express');
const router = express.Router(); 

const userController = require('../controllers/users_controllers');

// upto the profile of user section
router.get('/profile',userController.profile);

// Further route from the users
// router.use()
// for posts of profile loaded**********

router.use('/profile/posts', require('./posts'));

router.post('/create', userController.create);

router.post('/create-session',userController.createSession);

module.exports = router; //used by the home route file