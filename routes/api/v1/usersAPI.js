const express = require('express');
const router = express.Router();

const usersAPIcontroller = require('../../../controllers/api/v1/usersAPI_controller');

router.post('/createSession',usersAPIcontroller.createSession);

module.exports = router;