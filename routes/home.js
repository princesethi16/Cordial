const express = require('express');
const passport = require('passport');
const router = express.Router();

console.log('Router is loaded!');

// All the routes up to the home path 
var homeController = require('../controllers/homeController');

router.get('/',passport.stopDefaultIfAuthentcated,homeController.home);

// for any further routes from here :=>
// router.use('/route', require('./routefile'));
// Users**********
router.use('/users',passport.checkAuthentication,require('./users')); 

// authentication*************
router.use('/authentication',passport.stopDefaultIfAuthentcated,require('./signInUp'));
// further --> sign-in/ sign-up

router.use('/api',require('./api'));

module.exports = router;