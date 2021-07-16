// handle routes upto /feed page
const express = require('express');
const router = express.Router(); 

const userController = require('../controllers/users_controllers');

// upto the profile of user section
router.get('/feed',userController.feed);

router.use('/feed/posts', require('./posts'));

router.post('/create', userController.create);

router.post('/create-session',userController.createSession);

router.get('/sign-out',userController.endSession);

module.exports = router; //used by the home route file