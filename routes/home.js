const express = require('express');
const router = express.Router();

console.log('Router is loaded!');

// All the routes up to the home path 
var homeController = require('../controllers/homeController');

router.get('/', homeController.home);

// for any further routes from here :=>
// router.use('/route', require('./routefile'));
// Users**********
router.use('/users',require('./users')); 

router.use('/authentication',require('./signInUp'));

module.exports = router;