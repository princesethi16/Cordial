const express = require('express');
const router = express.Router();

var postsController = require('../controllers/profileController');
router.get('/', postsController.profile);

module.exports = router;