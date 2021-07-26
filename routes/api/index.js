const express = require('express');
const router = express.Router();

router.use('/v1',require('./v1'));
router.use('/v2',require('./v2'));

router.use('/users',require('./v1/usersAPI'));

module.exports = router;