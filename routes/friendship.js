const express = require('express');
const router = express.Router();
const friendshipController = require('../controllers/friendshipController');

router.post('/',friendshipController.sendRequest);

router.post('/reply',friendshipController.replyToRequest);

router.post('/unfriend',friendshipController.unfriend);

module.exports = router;