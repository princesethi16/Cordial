const express = require('express');
const router = express.Router();

console.log('Router is loaded!');

// All the routes up to the home path 
var homeController = require('../controllers/homeController');
router.get('/', homeController.home);

module.exports = router;