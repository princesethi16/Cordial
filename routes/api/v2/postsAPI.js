const express = require('express');
const passport = require('passport');
const router = express.Router();

const postsAPI_controller = require('../../../controllers/api/v2/postsAPI_controller');

router.get('/', postsAPI_controller.index);

module.exports = router;