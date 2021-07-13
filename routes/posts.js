const express = require('express');
const router = express.Router();

var postsController = require('../controllers/postsController');
router.get('/', postsController.posts);

module.exports = router;