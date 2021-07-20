const express = require('express');
const router = express.Router();

var profileController = require('../controllers/profileController');
router.get('/:user', profileController.profile);

module.exports = router;