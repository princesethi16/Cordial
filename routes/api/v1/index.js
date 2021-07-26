const express = require('express');
const passport = require('passport');
const router = express.Router();

router.use('/posts',require('./postsAPI'));

module.exports = router;